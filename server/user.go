package main

import (
	"encoding/json"
	"fmt"
)

type user struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Username string `json:"username" gorm:"unique"`
	Password string `json:"password"`
}

func (u user) MarshalJSON() ([]byte, error) {
	m := map[string]string{
		"id":   fmt.Sprintf("%d", u.ID),
		"name": u.Username,
	}
	return json.Marshal(m)
}

type userToJSON struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

func newUser(id uint, username, password string) *user {
	usr := user{ID: id, Username: username}
	return &usr
}
