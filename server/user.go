package main

type user struct {
	Id int `json:"id"`
	Name string  `json:"name"`
	Messages []message  `json:"messages"`
}

func newUser(id int, name string) *user {
	usr := user{Id: id, Name: name}
	usr.Messages = append(usr.Messages, *newMessage(0, "Hello, World"))
	return &usr
}