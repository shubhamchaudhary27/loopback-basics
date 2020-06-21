# loopback-basics

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)


## BASIC STEPS TO CREATE PROJECT

* npm i -g @loopback/cli
* lb4 app
* npm install loopback-connector-mongodb --save
* lb4 datasource mongoDS --connector mongoDB
* npm start

### create user model
* lb4 model : user(specify fields)
* lb4 repository : user
* lb4 controller : user
* NOTE: (This will create basic user model, apis with their CRUD operations)

