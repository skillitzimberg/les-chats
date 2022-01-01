package main

type message struct {
	Id int `json:"id"`
	UserID int `json:"user-id"`
	Text string `json:"text"`
}

func newMessage(id int, userID int, text string) *message {
	return &message{Id: 0, UserID: userID, Text: text}
}