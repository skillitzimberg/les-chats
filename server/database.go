package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBConfig struct {
  host     string
  port     int  
	dbuser   string
  dbname   string
}

var dbConfig = DBConfig{  
	"localhost",
  5432,
  "foreignfood",
  "chats",
}

func newDBConfig(host string, port int, db, username string) *DBConfig {
	return &DBConfig{host, port, db, username}
}

func (conf *DBConfig) GetConnectionString() string {
	return fmt.Sprintf("host=%s port=%d user=%s "+
		"dbname=%s sslmode=disable", conf.host, conf.port, conf.dbuser, conf.dbname)
}

func NewDatabase(conf DBConfig) *gorm.DB {
  psqlInfo := conf.GetConnectionString()
  psqlDB, err := sql.Open("postgres", psqlInfo)
  if err != nil {
    panic(err)
  }

  gormDB, err := gorm.Open(postgres.New(postgres.Config{
    Conn: psqlDB,
  }), &gorm.Config{})
  if err != nil {
    panic(err)
  }
	
	return gormDB
}
