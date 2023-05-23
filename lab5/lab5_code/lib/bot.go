package lib

import "net/http"

func methodUrl() string {
	return "https://api.telegram.org/bot"
}

func (b *Bot) NewBot(token string) *Bot {
	return &Bot{Token: token}
}

func (b *Bot) GetUpdatesChan() (UpdateChannel, error) {
	if b.Updates != nil {
		return b.Updates, nil
	}

	b.Updates = make(chan Update)
	return b.Updates, nil
}

func (b *Bot) setWebhook(url string) error {
	resp, err := http.Post()
	return nil
}