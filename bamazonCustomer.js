var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Culebra1990!",
    database: "bamazon"
})

connection.connect(function (err) {
    console.log("Connected as id:  " + connection.threadId)
    start();
})

var start = function () {
    inquirer.prompt({
        name: "showOrNo",
        type: "rawlist",
        message: "Would you like to see our inventory?",
        choices: ["Yes", "No"]
    }).then(function (answer) {
        if (answer.showOrNo == "Yes") {
            readProducts()
        } else {
       
        }
    })

}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }