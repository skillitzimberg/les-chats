package main

type user struct {
	ID uint `json:"id" gorm:"primaryKey"`
	Username string  `json:"username" gorm:"unique"`
	Password string  `json:"password"`
}

func newUser(id uint, username, password string) *user {
	usr := user{ID: id, Username: username}
	return &usr
}