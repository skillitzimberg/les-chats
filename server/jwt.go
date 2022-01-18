package main

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type Claims struct {
	Username string
	jwt.StandardClaims
}

var signingKey = []byte("Four cats is too many")

var expires = time.Now().Add(5 * time.Minute)

func NewClaim(usr user) *Claims {
	return &Claims{
		Username: usr.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expires.Unix(),
		},
	}
}

func (c Claims) NewWithClaims(alg jwt.SigningMethod) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	ss, err := token.SignedString(signingKey)

	fmt.Println(ss, err)
	return ss, err
}
