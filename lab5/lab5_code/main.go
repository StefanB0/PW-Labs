package main

import (
	"github.com/gofiber/fiber/v2"
)
// #FFFFFF
func main() {
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Listen(":3000")
}