package main

import "fmt"

func SetError(message string, err error) error {
	return fmt.Errorf("%s: %v", message, err)
}
