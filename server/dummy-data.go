package main

var userScott = newUser(0, "Scott")
var userYuLing = newUser(1, "Yu Ling")

var users = []user{*userScott, *userYuLing}

var message1 = newMessage(0, 1, "Hello from Yu Ling")
var message2 = newMessage(1, 0, "Hello from Scott")

var messages = []message{*message1, *message2}