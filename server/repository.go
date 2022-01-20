package main

import (
	"fmt"

	"gorm.io/gorm"
)

type Repository struct {
	db    *gorm.DB
	users *[]user
}

func NewRepo(db *gorm.DB) *Repository {
	users := []user{}
	return &Repository{db, &users}
}

func (r *Repository) MigrateSchema() {
	r.db.AutoMigrate(&user{}, &message{})
}

func (r *Repository) CreateUser(u *user) error {
	return r.db.Create(u).Error
}

func (r *Repository) GetUsers() (*[]user, error) {
	err := r.db.Find(&r.users).Error
	return r.users, err
}

func (r *Repository) GetUserByUsername(usr *user, username string) error {
	fmt.Println("GetUserByUsername", usr.Username, username)
	return r.db.Where("username = ?", username).First(&usr).Error
}
