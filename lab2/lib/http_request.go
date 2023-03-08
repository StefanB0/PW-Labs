package lib

import (
	"fmt"
	"strings"
)

const (
	HTTP1_0 = "HTTP/1.0"
	HTTP1_1 = "HTTP/1.1"
	GET     = "GET"

	HTTP_VERSION        = "HTTP_VERSION"
	HTTP_STATUS         = "HTTP_STATUS"
	HTTP_STATUS_MESSAGE = "HTTP_STATUS_MESSAGE"
	CONTENT_TYPE        = "Content-Type"
	CONTENT_LENGTH      = "Content-Length"
	EXPIRES             = "Expires"
	LOCATION            = "Location"
)

type HTTP_Response struct {
	Headers map[string]string
	Body    string
}

func validate_url(address string) string {
	if strings.HasPrefix(address, "https://") || strings.HasPrefix(address, "http://") {
		return address
	} else {
		return "http://" + address
	}
}

func generate_request(http_version, http_method, http_endpoint, address string) string {
	request := fmt.Sprintf("%s %s %s\r\n%s\r\n\r\n", http_method, http_endpoint, http_version, "Host: "+address)
	return request
}

func generate_query(query string) string {
	split := strings.Split(query, " ")
	join := strings.Join(split, "+")
	return "?q=" + join
}

func read_headers(request string) map[string]string {
	headers := make(map[string]string)
	header, _, _ := strings.Cut(request, "\r\n\r\n")
	header_array := strings.Split(header, "\r\n")
	http_status_line := strings.Split(header_array[0], " ")
	headers[HTTP_VERSION] = http_status_line[0]
	headers[HTTP_STATUS] = http_status_line[1]
	headers[HTTP_STATUS_MESSAGE] = strings.Join(http_status_line[2:], " ")

	for _, header_line := range header_array[1:] {
		header_line_array := strings.Split(header_line, ": ")
		headers[header_line_array[0]] = header_line_array[1]
	}
	return headers
}

func (h *HTTP_Response) Get_header(key string) string {
	return h.Headers[key]
}

func (h *HTTP_Response) Print_headers() {
	for key, value := range h.Headers {
		fmt.Printf("%s: %s\n", key, value)
	}
}

func read_body(request string) string {
	_, body, _ := strings.Cut(request, "\r\n\r\n")
	return body
}
