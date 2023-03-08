package lib

import (
	"bufio"
	"log"
	"os"
)

func saveToStorage(items []Search_Item) {
	file, err := os.Create("storage.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	for _, item := range items {
		file.Write([]byte(item.Title + "\r\n" + item.Url + "\r\n"))
	}
}

func readFromStorage() []Search_Item {
	file, err := os.Open("storage.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var items []Search_Item
	var url, title string
	for scanner.Scan() {
		title = scanner.Text()
		scanner.Scan()
		url = scanner.Text()
		items = append(items, Search_Item{title, url})
	}
	return items
}
