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
            connection.end();
       
        }
    })

}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      itemID()
      
    });
  }

  function itemID(){
    inquirer.prompt({
        name: "wItemID",
        type: "input",
        message: "What is the ID of the product they would like to buy?",
        choices: ["GSH", "GSK","CD","ROS","PMG","PP","DB","GE","MMS","AQH"]
    }).then(function (answer) {
        if (answer.wItemID == "GSH" || "GSK" || "CD" ||"ROS" || "PMG" ||"PP" || "DB" ||"GE" || "MMS" || "AQH") {
            itemQuantity()
        } else {
       console.log("Invalid input")
            connection.end();
        }
    })

}

function itemQuantity (){
    inquirer.prompt({
        name: "wItemQ",
        type: "input",
        message: "How many units of the product would you like to buy?",
        default: 1
    }).then(function (answer) {
        if (answer.wItemQ == 1 || 2 || 3 || 4 || 5) {
            connection.end();
        } else {
       
            connection.end();
        }
    })

}

function quanityCheck () {
    
}
  