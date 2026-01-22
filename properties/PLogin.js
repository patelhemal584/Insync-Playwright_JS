//require('dotenv').config();
const env = require('../env.config');

class PLogin{
    #username;
    #password;
    #registeredEmail;
    #selectPractice;
    #selectUser;
    constructor(page){
        this.page=page;
        // this.#app_username = env.USERNAME;
        // this.#app_password = env.PASSWORD;
        this.#username = env.APP_USERNAME;
        this.#password = env.APP_PASSWORD;//changed123

        this.#registeredEmail = process.env.registeredEmail;
        this.#selectPractice = process.env.practice;
        this.#selectUser = process.env.user;
    }

    get app_username(){ return this.#username };
    get app_password(){ return this.#password };
    get registeredEmail(){ return this.#registeredEmail };
    get selectPractice(){ return this.#selectPractice };
    get selectUser(){ return this.#selectUser };
}

module.exports = { PLogin };

