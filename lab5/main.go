package main

import (
	"log"
	"os"
	"telegram_bot/bot"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	telegramToken := os.Getenv("TELEGRAM_TOKEN")
	nytKey := os.Getenv("NYT_API_KEY")
	webhook_url := os.Getenv("WEBHOOK_URL")

	bot := bot.NewBot(telegramToken, nytKey)
	app := fiber.New()
	
	setAPIHandlers(app, bot.GetUpdatesChan())
	go bot.HandleUpdates()
	bot.SetWebhook(webhook_url)
	
	app.Listen(":8080")
}

func sendUpdates(ch bot.UpdatesChannel) {}

func setAPIHandlers(app *fiber.App, updatesChannel bot.UpdatesChannel) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World! 🌎")
	})
	app.Post("/", func(c *fiber.Ctx) error {
		var update bot.Update
		if err := c.BodyParser(&update); err != nil {
			return err
		}
		updatesChannel <- update
		return nil
	})
}
