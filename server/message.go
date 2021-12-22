package main

type message struct {
	Id int `json:"id"`
	Text string `json:"text"`
}

func newMessage(id int, text string) *message {
	return &message{Id: 0, Text: text}
}