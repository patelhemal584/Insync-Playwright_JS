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
        this.#username = env.USERNAME;
        this.#password = env.PASSWORD;
        this.#registeredEmail = process.env.registeredEmail;
        this.#selectPractice = process.env.practice;
        this.#selectUser = process.env.user;
    }

    get username(){ return this.#username };
    get password(){ return this.#password };
    get registeredEmail(){ return this.#registeredEmail };
    get selectPractice(){ return this.#selectPractice };
    get selectUser(){ return this.#selectUser };
}

module.exports = { PLogin };

