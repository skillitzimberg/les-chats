package main

type user struct {
	Id int `json:"id"`
	Username string  `json:"username"`
	Password string  `json:"password"`
}

func newUser(id int, username, password string) *user {
	usr := user{Id: id, Username: username}
	return &usr
}