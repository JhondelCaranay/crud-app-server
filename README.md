## Guide to run the project

1. install all dependencies

```bash

npm  install

```

2.  then create a mysql database with any name eg. "crud_api_db"

3.  add .env file in root directory of the project and paste this code below

        I use xampp mysql database
        username : "root"
        password : ""
        port: 3306
        database name : "crud_api_db"

        DATABASE_URL="mysql://username:password@localhost:3306/crud_api_db"

```bash
# DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/database_name"
DATABASE_URL="mysql://root:@localhost:3306/crud_api_db"
ACCESS_TOKEN_SECRET="mysecretaccesstoken"
REFRESH_TOKEN_SECRET="mysecretrefreshtoken"
```

4. create database using prisma cli (make sure you add DATABASE_URL in env file)

```bash

npx prisma db push

```

5. to run in development server

```bash

npm run dev
# this will run in port localhost:3500
```

6. you can test this following routes in postman

```bash
# register
POST http://localhost:3500/api/auth/register
request body
{
"name":  "",
"email":  "",
"password":""
}

#login
POST http://localhost:3500/api/auth/login
{
"email":  "",
"password":""
}

#current login user
POST http://localhost:3500/api/auth/profile
Headers Authorization : Bearer Token

POST http://localhost:3500/api/items
Headers Authorization : Bearer Token
{
"name":  "",
"description":  ""
}

# user created items
GET http://localhost:3500/api/items
Headers Authorization : Bearer Token

# item detail
GET http://localhost:3500/api/items/1
Headers Authorization : Bearer Token

# delete item
DELETE http://localhost:3500/api/items/4
Headers Authorization : Bearer Token

#update item
PATCH http://localhost:3500/api/items/1
Headers Authorization : Bearer Token
{
"name":  "",
"description":  ""
}
```
