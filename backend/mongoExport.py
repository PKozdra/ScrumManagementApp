# file for exporting data from mongoDB to JSON file

from pymongo import MongoClient
import pandas as pd

# connect to mongoDB

#DATABASE='mongodb+srv://piotrek:123456Az@cluster0.wrqjhaw.mongodb.net/tester?retryWrites=true&w=majority'
#PORT=8000
#JWT_SECRET="hhskjhkhsrk^B^BwB868"

print('Connecting to MongoDB...')

client = MongoClient('mongodb+srv://piotrek:123456Az@cluster0.wrqjhaw.mongodb.net/tester?retryWrites=true&w=majority')

db = client['tester']

print('Connected to MongoDB')

# print what collections are in the database

print('Collections in the database:')

# there are collections: ['tickets', 'users', 'meetings', 'boards']

print(db.list_collection_names())

# export data from mongoDB to JSON file

print('Exporting data from MongoDB to JSON file...')

# find and print collections schemas

print('Collections schemas:')

for collection in db.list_collection_names():
    print(collection)
    print(db[collection].find_one())

# export data from mongoDB to JSON file



