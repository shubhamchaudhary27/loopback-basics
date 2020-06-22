# loopback-basics

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)


## BASIC STEPS TO CREATE PROJECT
* git clone "project link mentioned in github"
* npm i -g @loopback/cli
* lb4 app
* npm install loopback-connector-mongodb --save
* lb4 datasource mongoDS --connector mongoDB
* npm start

## FEATURE 1
### create user model
* lb4 model : user(specify fields)
* lb4 repository : user
* lb4 controller : user
* NOTE: (This will create basic user model, apis with their CRUD operations)

## FEATURE 2
### create password model
* lb4 model : password(specify fields)
* lb4 repository : password
* NOTE: (This will create basic password model, apis with their CRUD operations)

#### changes in project
* request format is changed for api POST  /user(api used for create user) as password is added.
* Service is added for creating hash and verify hash using bcrypt(Location: loopback-basics/src/services/hash.password.bcryptjs)
* password is stored in password model with respective userID

## FEATURE 3
#### changes in project
* New api is added for user login : POST /users/login.
* Service is added for creating JWT (Location: loopback-basics/src/services/jwt-service) using loopback authentication @loopback/authentication
* Service is added for verifying hash of bcrypt(Location: loopback-basics/src/services/user-service)
* accessToken  is updated in password model after successful login
