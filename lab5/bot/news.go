package bot

type LatestNewsResponse struct {
	Response struct {
		Docs []Article `json:"docs"`
	} `json:"response"`
}

type Article struct {
	Abstract string `json:"abstract"`
	Snippet  string `json:"snippet"`
	WebURL   string `json:"web_url"`
	Source   string `json:"source"`
}
