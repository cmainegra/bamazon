var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "charlie",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    customerBegin();
});
console.log(process.argv);

function customerBegin() {
    var query = "SELECT * FROM items";
    console.log("welcome user");
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        customerPrompt();
    });
};

function customerPrompt() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What's the ID number of the item you'd like to purchase?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ])
        .then(function (answer) {
            var query = "SELECT * FROM items WHERE ?";
            connection.query(query, { id: answer.id }, function (err, res) {
                if(err) throw err;
                console.log(res);
            var updatedQuantity = res[0].stock_quantity - answer.amount;
            if (updatedQuantity < res[0].stock_quantity) {
            console.log("You selected " + answer.amount + " of the " + res[0].product_name + " and we currently have " + res[0].stock_quantity + " left in stock.");
            connection.query("UPDATE items SET stock_quantity = ? WHERE id = ?", { stock_quantity: updatedQuantity, id: answer.id }, function(err, res) {

            })    
        } else {
                console.log("Sorry we don't have enough of that item in stock.")
            }
            })
        });
    };
