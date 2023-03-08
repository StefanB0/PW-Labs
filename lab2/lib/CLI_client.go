package lib

import (
	"flag"
	"fmt"
	"log"
	"strings"
	"github.com/pkg/browser"
)

const (
	U_FLAG = iota
	SA_FlAG
	S_FLAG
)

const (
	SEARCH_SIZE = 10
)

type CLI_Client struct {
	flag          int
	url           string
	search_prompt string
	access_nr     int
}

func (c *CLI_Client) parse_prompt() {
	u_flag_ptr := flag.Bool("u", false, "make an HTTP request to the specified URL and print the response")
	s_flag_ptr := flag.Bool("s", false, "make an HTTP request to search the term using your favorite search engine and print top 10 results")

	var access_nr int
	flag.IntVar(&access_nr, "sa", 0, "open in browser the selected search result")

	flag.Parse()

	switch {
	case *u_flag_ptr && *s_flag_ptr:
		log.Fatal("invalid flags combination")
	case *u_flag_ptr:
		c.flag = U_FLAG
		c.url = flag.Arg(0)
	case *s_flag_ptr:
		c.flag = S_FLAG
		search_prompt := flag.Args()
		c.search_prompt = strings.Join(search_prompt, " ")
	case access_nr != 0:
		c.flag = SA_FlAG
		c.access_nr = access_nr
	default:
		log.Fatal("invalid flags combination")
	}
}

func (c *CLI_Client) CLI_ClientStart() {
	c.parse_prompt()

	switch c.flag {
	case U_FLAG:
		response := get_request_with_redirect(c.url, 0)
		text := parse_web_content(response)
		fmt.Print(text)
	case S_FLAG:
		query := generate_query(c.search_prompt)
		address := "http://html.duckduckgo.com/html/" + query
		response := get_request(address)
		results := parse_search_results(response.Body, SEARCH_SIZE)
		for i, result := range results {
			if result != "" {
				fmt.Printf("%d) %s\n", i+1, result)
			}
		}
		saveToStorage(results)
	case SA_FlAG:
		memory := readFromStorage()
		if c.access_nr > len(memory) || c.access_nr < 1 {
			log.Fatal("invalid number")
		}
		browser.OpenURL(memory[c.access_nr-1])
	}
}
