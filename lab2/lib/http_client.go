package lib

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"net"
	"net/url"
	"strconv"
	"strings"
	"time"
)

func get_request_with_redirect(address string, redirect_nr int) HTTP_Response {
	response := get_request(address)
	if strings.Contains("301 302 307 308", response.Headers[HTTP_STATUS]) {
		redirect_nr += 1
		if redirect_nr < 5 {
			return get_request_with_redirect(response.Headers[LOCATION], redirect_nr)
		}
	}

	if redirect_nr >= 5 {
		fmt.Println("TOO MANY REDIRECTS")
	}

	return response
}

func get_request(address string) HTTP_Response {
	address = validate_url(address)
	url, err := url.Parse(address)
	if err != nil {
		log.Fatal(err)
	}

	http_v := HTTP1_0
	port := 80
	if strings.HasPrefix(address, "https://") {
		http_v = HTTP1_1
	}

	request := generate_request(http_v, GET, url.RequestURI(), url.Hostname())
	raw_response := tcp_request(url.Hostname(), request, port)

	response := HTTP_Response{
		Headers: read_headers(raw_response),
		Body:    read_body(raw_response),
	}
	return response
}

func tcp_request(address, request string, port int) string {
	dial_address := address + ":" + strconv.Itoa(port)
	conn, err := net.Dial("tcp", dial_address)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	conn.SetDeadline(time.Now().Add(5 * time.Second))
	fmt.Fprint(conn, request)

	response := read_response(conn)
	return response
}

func read_response(conn net.Conn) string {
	reader := bufio.NewReader(conn)
	buffer := bytes.NewBuffer(make([]byte, 0))

	for {
		b, err := reader.ReadByte()
		if err != nil {
			break
		}
		buffer.Write([]byte{b})
	}

	return buffer.String()
}
