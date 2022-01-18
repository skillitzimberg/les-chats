package main

import "gorm.io/gorm"

type Repo struct {
	db    *gorm.DB
	users *[]user
}

func NewRepo(db *gorm.DB) *Repo {
	users := []user{}
	return &Repo{db, &users}
}

func (r *Repo) MigrateSchema() {
	r.db.AutoMigrate(&user{}, &message{})
}

func (r *Repo) CreateUser(u *user) error {
	return r.db.Create(u).Error

}

func (r *Repo) GetUsers() (*[]user, error) {
	err := r.db.Find(&r.users).Error
	return r.users, err
}
