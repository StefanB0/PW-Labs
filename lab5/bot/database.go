package bot

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	client     *mongo.Client
	collection *mongo.Collection
}

type UserCollection struct {
	UserID   int64
	NewsUrls []string `bson:"news_urls,omitempty"`
}

func ConnectDatabase() *Database {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	coll := client.Database("telegram_bot").Collection("users")
	return &Database{client: client, collection: coll}
}

func (db *Database) SaveNews(user int64, url string) {
	userExists := db.collection.FindOne(context.TODO(), bson.D{{Key: "user_id", Value: user}})
	if userExists.Err() != nil {
		_, err := db.collection.InsertOne(context.TODO(), bson.D{
			{Key: "user_id", Value: user},
			{Key: "news_urls", Value: []string{url}},
		})
		if err != nil {
			panic(err)
		}
	} else {
		_, err := db.collection.UpdateOne(context.TODO(), bson.D{{Key: "user_id", Value: user}}, bson.D{
			{Key: "$push", Value: bson.D{
				{Key: "news_urls", Value: url},
			}},
		})
		if err != nil {
			panic(err)
		}
	}
}

func (db *Database) GetSavedNews(user int64) []string {
	var userCollection UserCollection
	err := db.collection.FindOne(context.TODO(), bson.D{{Key: "user_id", Value: user}}).Decode(&userCollection)
	if err != nil {
		panic(err)
	}

	if len(userCollection.NewsUrls) == 0 {
		return []string{"No saved news"}
	} else if len(userCollection.NewsUrls) > 5 {
		return userCollection.NewsUrls[len(userCollection.NewsUrls)-5:]
	}
	
	return userCollection.NewsUrls
}
