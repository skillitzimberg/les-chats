package main

type user struct {
	Id int `json:"id"`
	Username string  `json:"username"`
}

func newUser(id int, username string) *user {
	usr := user{Id: id, Username: username}
	return &usr
}