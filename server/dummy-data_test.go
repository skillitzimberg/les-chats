package main

import "testing"

func TestIsUniqueUser(t *testing.T) {
	var tests = []struct {
		usr user
		want bool
	}{
		{*newUser(9, "Scoott", "qwe"), true},
		{*newUser(9, "Scott", "qwe"), false},
		{*newUser(12, "Yu Ling", "qwe"), false},
		{*newUser(12, "Yu Liing", "qwe"), true},
	}

	for _, tt := range tests {
		testName := tt.usr.Username
		t.Run(testName, func(t *testing.T) {
			isUnique := isUniqueUser(tt.usr)
			if isUnique != tt.want {
				t.Errorf("got %v; want %v", isUnique, tt.want)
			}
		})
	} 
}