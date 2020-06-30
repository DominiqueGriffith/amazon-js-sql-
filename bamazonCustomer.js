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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        itemQuantity()

    });
}

// function itemID() {
//     inquirer.prompt({
//         name: "wItemID",
//         type: "input",
//         message: "What is the ID of the product they would like to buy?",
//         choices: ["GSH", "GSK", "CD", "ROS", "PMG", "PP", "DB", "GE", "MMS", "AQH"]
//     }).then(function (answer) {
//         if (answer.wItemID == "GSH" || "GSK" || "CD" || "ROS" || "PMG" || "PP" || "DB" || "GE" || "MMS" || "AQH") {
//             itemQuantity()
//         } else {
//             console.log("Invalid input")
//             connection.end();
//         }
//     })

// }

//     }).then(function (answer) {
//         if (answer.wItemQ == 1 || 2 || 3 || 4 || 5) {
//             connection.end();
//         } else {

//             connection.end();
//         }
//     })

// }

// How many units of the product would you like to buy?

function itemQuantity() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",

                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id)
                    }
                    return choiceArray;
                },
                message: "What is the ID of the product they would like to buy?"
            },
            {
                name: "iQuant",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        var quantityC = stock_quantity
                        choiceArray.push(results[i].stock_quantity)
                    }
                    return choiceArray;
                },

                message: "How many units of the product would you like to buy?"
            }
        ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }

                    else if (chosenItem.stock_quantity === answer.iQuant) {
                        console.log(chosenItem.stock_quantity);
                    }

                }

            });


    });

}
