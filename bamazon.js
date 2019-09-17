// importing the following modules from the npm package

const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs")

// defining a few more variables for user input

const productID = process.argv[2]
const quantity = process.argv[3]

// creating a connection to my server

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"

})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayInventory();
});

// displays the items for sale when the store loads

function displayInventory() {
    console.log("Here's our store inventory for you to peruse!\n")
    const query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

// queries the user for the id of the product they'd like to purchase

function chooseProduct() {
    console.log("Please enter the id of the item you'd like to purchase!\n");
    const query = connection.query("SELECT ProductID FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });

}

// queries the user for the quentity

function chooseQuantity () {
    console.log("Please enter the quantity of the item you'd like to purchase!\n");
    });

}

}

// checks inventory

function checkInventory() {
    
}

// updates inventory

function updateInventory()