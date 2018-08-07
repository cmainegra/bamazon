var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "charlie",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    customerBegin();
});
console.log(process.argv);

function customerBegin() {
    var query = "SELECT * FROM items";
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id  + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity); 
        }
        customerPrompt();
    });
};

function customerPrompt() {
    inquirer
        .prompt({
            name: "choice",
            type: "rawlist",
            message: "What would you like to do?",
        })
}