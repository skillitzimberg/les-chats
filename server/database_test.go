package main

import "testing"

func TestNewDBConfig(t *testing.T) {
	var tests = []struct {
		cnf DBConfig
		want DBConfig
	}{
		{*newDBConfig("localhost", 1234, "someuser", "someusername"), DBConfig{"localhost", 1234, "someuser", "someusername"}},
	}

	for _, tt := range tests {
		testName := tt.cnf.dbuser
		t.Run(testName, func(t *testing.T) {
			if tt.cnf.dbuser != tt.want.dbuser {
				t.Errorf("got %v; want %v", tt.cnf, tt.want)
			}
		})
	} 
}