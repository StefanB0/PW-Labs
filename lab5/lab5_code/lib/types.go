package lib

type Bot struct {
	Token string
	Updates UpdateChannel
}

// Update is an update response, from GetUpdates.
type Update struct {
	UpdateID int `json:"update_id"`
	
	Message *Message `json:"message,omitempty"`
}

type UpdateChannel <-chan Update

type Message struct {}

type User struct {
	// ID is a unique identifier for this user or bot
	ID int64 `json:"id"`
	// IsBot true, if this user is a bot
	//
	// optional
	IsBot bool `json:"is_bot,omitempty"`
	// FirstName user's or bot's first name
	FirstName string `json:"first_name"`
	// LastName user's or bot's last name
	//
	// optional
	LastName string `json:"last_name,omitempty"`
	// UserName user's or bot's username
	//
	// optional
	UserName string `json:"username,omitempty"`
	// LanguageCode IETF language tag of the user's language
	// more info: https://en.wikipedia.org/wiki/IETF_language_tag
	//
	// optional
	LanguageCode string `json:"language_code,omitempty"`
	// CanJoinGroups is true, if the bot can be invited to groups.
	// Returned only in getMe.
	//
	// optional
	CanJoinGroups bool `json:"can_join_groups,omitempty"`
	// CanReadAllGroupMessages is true, if privacy mode is disabled for the bot.
	// Returned only in getMe.
	//
	// optional
	CanReadAllGroupMessages bool `json:"can_read_all_group_messages,omitempty"`
	// SupportsInlineQueries is true, if the bot supports inline queries.
	// Returned only in getMe.
	//
	// optional
	SupportsInlineQueries bool `json:"supports_inline_queries,omitempty"`
}

type Chat struct {}