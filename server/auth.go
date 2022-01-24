package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt"
)

func IsAuthorized(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusUnauthorized)
		c, err := r.Cookie("token")
		if err != nil {
			json.NewEncoder(w).Encode(SetError("no token found", err).Error())
			return
		}

		token, err := jwt.Parse(c.Value, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("there was an error in parsing")
			}
			return signingKey, nil
		})

		if err != nil {
			json.NewEncoder(w).Encode(SetError("your token has been expired", err).Error())
			return
		}

		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			w.WriteHeader(http.StatusOK)
			handler.ServeHTTP(w, r)
			return
		}

		json.NewEncoder(w).Encode(SetError("not authorized", err).Error())
	}
}
