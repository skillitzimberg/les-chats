package main

import "testing"

func TestNewDBConfig(t *testing.T) {
	var tests = []struct {
		cnf  DBConfig
		want DBConfig
	}{
		{*NewDBConfig("some db name", "Some db user", "localhost", 1234), DBConfig{"some db name", "Some db user", "localhost", 1234}},
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
