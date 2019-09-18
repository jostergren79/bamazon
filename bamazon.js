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
    console.log("Here's our store inventory for you to peruse!\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
        chooseProduct()
    });
}

// queries the user for the id of the product they'd like to purchase

function chooseProduct() {
    console.log("Please enter the id of the item you'd like to purchase!\n");
    const query = connection.query("SELECT ProductID FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
        chooseQuantity ()
    });

}

// queries the user for the quantity of the id they'd like to purchase

function chooseQuantity () {
    console.log("Please enter the quantity of the item you'd like to purchase!\n");
   
}

// checks inventory for availability 

function checkInventory() {
    console.log("Checking inventory to see if we have enough of your item in stock!\n");
 
    
}

// updates product

function updateProduct() {
    console.log("Updating product quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " products updated!\n");
        deleteProduct();
      }
    );