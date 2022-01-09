package main

var userScott = newUser(9, "Scott", "qwe")
var userYuLing = newUser(12, "Yu Ling", "qwe")

var users = []user{*userScott, *userYuLing}

var message1 = newMessage(5, userYuLing.Id, "Hello from Yu Ling")
var message2 = newMessage(2, userScott.Id, "Hello from Scott")

var messages = []message{*message1, *message2}

func isUniqueUser(newUser user) bool {
	isUnique := true
	for _, u := range users {
		if newUser.Username == u.Username {
			isUnique = false
		}
	}
	return isUnique
}