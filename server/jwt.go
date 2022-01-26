package main

import (
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type Claims struct {
	Username string
	jwt.StandardClaims
}

var signingKey = []byte("Four cats is too many")

var expires = time.Now().Add(1 * time.Minute)

func NewClaims(usr user) *Claims {
	return &Claims{
		Username: usr.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expires.Unix(),
		},
	}
}

func (c Claims) NewWithClaims(alg jwt.SigningMethod) (string, error) {
	token := jwt.NewWithClaims(alg, c)
	ss, err := token.SignedString(signingKey)
	return ss, err
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
