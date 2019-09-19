// importing the following dependancies 

const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs")
require("console.table")

// creating a connection to server

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

// displaying the inventory on connection

function displayInventory() {
    console.log("Here's our store inventory for you to peruse!\n");
    const query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        chooseProduct(res)
    });
}

// prompting the user for product id

function chooseProduct(inventory) {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the product id that you'd like to purchase?"
        }])
        .then(function (val) {
            const choiceid = parseInt(val.name)
            const item = checkInventory(choiceid, inventory)
            if (item) {
                promptforquantity(item)
            } else {
                console.log("I'm sorry we are out of this item!")
                displayInventory()
            }
        })
}

// checking the inventory for product quantity 

function checkInventory(choiceid, inventory) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id === choiceid) {
            return inventory[i]
        }
    }
    return null
}

// prompting the user for a quantity 

function promptforquantity(item) {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the quantity that you'd like to purchase?"
        }])
        .then(function (val) {
            const quantity = parseInt(val.name)
            console.table("The item you have chosen is", item.product_name)
            if (quantity > item.instock) {
                console.log("We do not have enough in stock")
                displayInventory()
            } else {
                const total = quantity * item.price
                console.log("The total cost to you in dollars is $" +  total + " thank you for shopping with us!")

                finalizePurchase(item, quantity)
            }
        })
}

// confirms purchase with customer and updates inventory

function finalizePurchase(item, quantity) {
    connection.query("UPDATE products SET instock = instock - ? WHERE id = ?",
        [quantity, item.id],
        function (err, res) {
            if (err) throw err;

            displayInventory()
        });

}



