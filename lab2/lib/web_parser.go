package lib

import (
	"bytes"
	"encoding/json"
	"log"
	"strings"

	"golang.org/x/net/html"
)

type Search_Item struct {
	Title string
	Url   string
}

const (
	text_tags = "p a li span h1 h2 h3 h4 h5 h6 strong em b i"
)

func parse_web_content(response HTTP_Response) string {
	if strings.Contains(response.Headers[CONTENT_TYPE], "html") {
		return parse_html(response.Body)
	} else if strings.Contains(response.Headers[CONTENT_TYPE], "json") {
		return Parse_json(response.Body)
	}
	return "content type not accepted"
}

func Parse_json(body string) string {
	var prettyJSON bytes.Buffer
	error := json.Indent(&prettyJSON, []byte(body), "", "  ")
	if error != nil {
		log.Println("JSON parse error: ", error)
		return body
	}
	return prettyJSON.String()
}

func parse_html(body string) string {
	parsed_html := bytes.NewBuffer(make([]byte, 0))
	z := html.NewTokenizer(strings.NewReader(body))
	last_element := ""
	for {
		tt := z.Next()
		switch {
		case tt == html.ErrorToken:
			return parsed_html.String()
		case tt == html.StartTagToken:
			t := z.Token()
			last_element = t.Data
		case tt == html.TextToken:
			if strings.Contains(text_tags, last_element) {
				text := strings.Trim(string(z.Text()), " \t\r\n")
				if text != "" {
					parsed_html.WriteString(text + "\r\n")
				}
			}
		}
	}
}

func parse_search_results(body string, n int) []Search_Item {
	z := html.NewTokenizer(strings.NewReader(body))
	results := make([]Search_Item, n)
	count := 0
	for count < n {
		tt := z.Next()
		switch {
		case tt == html.ErrorToken:
			return results
		case tt == html.StartTagToken:
			t := z.Token()
			if t.Data == "h2" && t.Attr[0].Val == "result__title" {
				z.Next()
				z.Next()
				z.Next()
				title := strings.Trim(string(z.Text()), " \t\r\n")
				results[count].Title = title
			}
			if t.Data == "a" && t.Attr[0].Val == "result__url" {
				z.Next()
				url := strings.Trim(string(z.Text()), " \t\r\n")
				results[count].Url = url
				count++
			}
		}
	}
	return results
}
