package bot

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

const helpMessage = `🤖 *Available commands:*
/start - show welcome message
/help - show help message
/latest_news [topic] - show latest news, optionally filtered by topic
/save_news url - save news to read later
/saved_news - show saved news`

const startMessage = "Hello, World! 🌎"

type Bot struct {
	telegramToken string
	nytApiKey     string
	database      *Database
	updates       UpdatesChannel
}

func NewBot(telegramToken string, NYTKey string) *Bot {
	updateChannel := make(chan Update)
	database := ConnectDatabase()
	return &Bot{telegramToken: telegramToken, nytApiKey: NYTKey, updates: updateChannel, database: database}
}

func (b *Bot) GetUpdatesChan() UpdatesChannel {
	return b.updates
}

func (b *Bot) SetWebhook(url string) error {
	apiUrl := b.methodUrl("setWebhook")
	body := strings.NewReader(fmt.Sprintf(`{"url": "%s", "max_connections": 10}`, url))
	_, err := http.Post(apiUrl, "application/json", body)
	return err
}

func (b *Bot) methodUrl(method string) string {
	return fmt.Sprintf(APIEndpoint, b.telegramToken, method)
}

func (b *Bot) HandleUpdates() {
	for update := range b.updates {
		b.handleUpdate(update)
	}
}

func (b *Bot) handleUpdate(update Update) {
	if update.Message != nil {
		b.handleMessage(update.Message)
	}
}

func (b *Bot) handleMessage(message *Message) {
	user := message.From
	text := message.Text

	if user == nil {
		return
	}

	log.Println(fmt.Sprintf("Received message from %s (id: %d) with text: \"%s\"", user.FirstName, user.ID, text))

	if text == "/start" {
		b.sendTextMessage(message.Chat.ID, startMessage)
	} else if text == "/help" {
		b.sendTextMessage(message.Chat.ID, helpMessage)
	} else if strings.HasPrefix(text, "/latest_news") {
		b.showLatestNews(user, text)
	} else if strings.HasPrefix(text, "/save_news") {
		b.saveNews(user, text)
	} else if text == "/saved_news" {
		b.showSavedNews(user, text)
	} else {
		b.sendTextMessage(message.Chat.ID, "Command unknown 🤔")
	}
}

func (b *Bot) sendTextMessage(chatID int64, text string) {
	url := b.methodUrl("sendMessage")
	messageText := strings.NewReader(fmt.Sprintf(`{"chat_id": %d, "text": "%s"}`, chatID, text))
	http.Post(url, "application/json", messageText)
}

func (b *Bot) showLatestNews(user *User, text string) {
	textArray := strings.Split(text, " ")
	if len(textArray) == 1 {
		newsArray := b.getLatestNews("")
		message := formatNews(newsArray)
		b.sendTextMessage(user.ID, message)
	} else {
		topic := strings.Join(textArray[1:], " ")
		newsArray := b.getLatestNews(topic)
		message := formatNews(newsArray)
		message = fmt.Sprintf("Latest news about %s:\n\n%s", topic, message)
		b.sendTextMessage(user.ID, message)
	}
}

func (b *Bot) saveNews(user *User, text string) {
	textSplit := strings.Split(text, " ")
	if len(textSplit) != 2 {
		b.sendTextMessage(user.ID, "Please provide a URL to save")
		return
	}

	b.database.SaveNews(user.ID, textSplit[1])
	log.Println(fmt.Sprintf("Saved news for user %d, %s", user.ID, textSplit[1]))
}

func (b *Bot) showSavedNews(user *User, text string) {
	newsArray := b.database.GetSavedNews(user.ID)
	message := formatUrls(newsArray)
	b.sendTextMessage(user.ID, message)

}

func (b *Bot) getLatestNews(topic string) []Article {
	url := fmt.Sprintf("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%s&api-key=%s", topic, b.nytApiKey)

	res, err := http.Get(url)
	if err != nil {
		log.Print("Error", err)
	}

	var newsResponse LatestNewsResponse
	jsonBody, _ := ioutil.ReadAll(res.Body)
	json.Unmarshal(jsonBody, &newsResponse)

	return newsResponse.Response.Docs[:5]
}

func formatNews(news []Article) string {
	var buffer bytes.Buffer
	for _, article := range news {
		buffer.WriteString(fmt.Sprintf("*%s*\n_%s_\n%s\n\n", article.Source, article.Abstract, article.WebURL))
	}
	return buffer.String()
}

func formatUrls(urls []string) string {
	var buffer bytes.Buffer
	for _, url := range urls {
		buffer.WriteString(fmt.Sprintf("%s\n", url))
	}
	return buffer.String()
}
