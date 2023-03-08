package lib

import (
	"log"
	"os"
)

func write_string_to_file(file_name, string_to_write string) {
	file, err := os.Create(file_name)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	file.Write([]byte(string_to_write))
}
