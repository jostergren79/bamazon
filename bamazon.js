// importing the following modules from the npm package

const inquirer = require("inquirer");
const mysql = require("mysql");
const fs = require("fs")
require("console.table")

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
    const query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        chooseProduct(res)
    });
}

// queries the user for the id of the product they'd like to purchase

function chooseProduct(inventory) {

    inquirer.prompt([

                {
                    type: "input",
                    name: "name",
                    message: "What is the product id that you'd like to purchase?"
                }
    ])

    .then(function(val) {
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

function checkInventory(choiceid, inventory) {

    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].id===choiceid){
          return inventory[i]
      }
    
        
    }
return null
}


                
function promptforquantity (item) {
    inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "What is the quantity that you'd like to purchase?"
        }
])

.then(function (val){
    const quantity = parseInt(val.name)
    console.log("item", item)
    if (quantity > item.instock) {
        console.log("We do not have enough in stock")
        displayInventory()
        
        
    } else {
        finalizePurchase(item, quantity)


    }


})

}

function finalizePurchase (item, quantity) {
    // UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];
connection.query("UPDATE products SET instock = instock - ? WHERE id = ?",
[quantity, item.id],
function (err, res) {
        if (err) throw err;
        console.log("success");
        displayInventory()

    });

}




                // // queries the user for the quantity of the id they'd like to purchase

                // function chooseQuantity () {
                //     console.log("Please enter the quantity of the item you'd like to purchase!\n");

                // }

                // // checks inventory for availability 

                // function checkInventory() {
                //     console.log("Checking inventory to see if we have enough of your item in stock!\n");


                // }

                // // updates product

                // function updateProduct() {
                //     console.log("Updating product quantities...\n");
                //     var query = connection.query(
                //       "UPDATE products SET ? WHERE ?",
                //       [
                //         {
                //           quantity: 100
                //         },
                //         {
                //           flavor: "Rocky Road"
                //         }
                //       ],
                //       function(err, res) {
                //         if (err) throw err;
                //         console.log(res.affectedRows + " products updated!\n");
                //         deleteProduct();
                //       }
                //     );