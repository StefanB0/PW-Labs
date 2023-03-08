package lib

import (
	"fmt"
	"log"
	"os"
)

func saveToStorage(urls []string) {
	file, err := os.Create("storage.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	for _, url := range urls {
		file.Write([]byte(url + "\r\n"))
	}
}

func readFromStorage() []string {
	file, err := os.Open("storage.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	var urls []string
	var url string
	for {
		_, err := fmt.Fscanln(file, &url)
		if err != nil {
			break
		}
		urls = append(urls, url)
	}
	return urls
}
