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

var pChosenItem;
var answerIqaunt;
var qChosenItem;
var chosenItem;
var choiceArrayOne = [];

var choiceArrayTwo = [];
var choiceArrayThree = [];

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
        itemCheck()

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

function itemCheck() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",

                choices: function () {

                    for (var i = 0; i < results.length; i++) {
                        choiceArrayOne.push(results[i].item_id)
                    }
                    return choiceArrayOne;
                },
                message: "What is the ID of the product they would like to buy?"
            },
            {
                name: "iQuant",
                type: "input",
                // choices: function () {

                //     for (var i = 0; i < results.length; i++) {
                //         // var quantityC = stock_quantity
                //         choiceArrayTwo.push(results[i].stock_quantity)
                //         choiceArrayThree.push(results[i].price)
                //     }
                //     return choiceArrayTwo;
                //     return choiceArrayThree;
                // },

                message: "How many units of the product would you like to buy?"
            }
            // {
            //     name: "totalCost",
            //     type: "input",
            //     // choices: function () {

            //     //     for (var i = 0; i < results.length; i++) {
            //     //         // var quantityC = stock_quantity
            //     //         choiceArrayThree.push(results[i].price)

            //     //     }
            //     //     return choiceArrayThree;
            //     // },

            //     message: "Just to confirm, you want to buy " + choiceArrayTwo + "at " + choiceArrayThree + " each?"
            // }
        ])
            .then(function (answer) {

                for (var i = 0; i < results.length; i++) {


                    if (results[i].item_id === answer.choice && results[i].stock_quantity < answer.iQuant) {
                        answerIqaunt = answer.iQuant;
                        chosenItem = results[i].item_id;
                        // var chosenItemJ = JSON.stringify(chosenItem); 
                        console.log("You selected  " + chosenItem);
                        // var qChosenItem = JSON.stringify(results[i]);
                        qChosenItem = results[i].stock_quantity;

                        console.log("Quantity  " + qChosenItem);
                        // itemQuantity();
                        console.log("Insufficient quanity. There is only " + qChosenItem + "." + "You selected " + answer.iQuant + ".")
                      
                    }
                    else if (results[i].item_id === answer.choice && results[i].stock_quantity > answer.iQuant) {
                        answerIqaunt = answer.iQuant;

                        chosenItem = results[i].item_id;
                        qChosenItem = results[i].stock_quantity;
                        var newProductQuant = qChosenItem - answerIqaunt;
                        connection.query(

                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quanity: newProductQuant
                                },
                                {

                                    item_id: chosenItem
                                }
                            ],
                            function (err) {
                                if (err) throw err;

                            }
                        );
                        console.log(chosenItem + " products updated!There are(is) " + newProductQuant + " " + chosenItem + " left.");
                        pChosenItem = results[i].price;
                        var yourTotal = answer.iQuant * pChosenItem;
                        console.log("Your total is $" + yourTotal + ".00" + ".");



                    }
                    else {
                      
                    }
                    // if (results[i].stock_quantity < answer.iQuant) {
                    //     console.log("Insufficient quanity. There is only " + results[i].stock_quantity + "." + "You selected " + answer + ".")
                    // }
                    //     else {
                    //         console.log("We will process your order. There is " + results[i].stock_quantity)
                    //     connection.end();
                    // }

                }

            });







        //  return qChosenItem



        // function itemQuantity() {

        //     inquirer.prompt([
        //         {
        //             name: "iQuant",
        //             type: "input",
        //             // choices: function () {

        //             //     for (var i = 0; i < results.length; i++) {
        //             //         // var quantityC = stock_quantity
        //             //         choiceArrayTwo.push(results[i].stock_quantity)
        //             //     }
        //             //     return choiceArrayTwo;
        //             // },

        //             message: "How many units of the product would you like to buy?"
        //         }
        //     ])
        //         .then(function (answer) {
        //             var chosenItem;
        //             for (var i = 0; i < results.length; i++) {
        //                 if (results[i].stock_quantity < answer) {
        //                     chosenItem = results[i].stock_quantity;
        //                     // var chosenItemJ = JSON.stringify(chosenItem); 
        //                     console.log("Isufficient quanity")
        //                     console.log("You selected  " + chosenItem);
        //                     // var qChosenItem = JSON.stringify(results[i]);
        //                     //  qChosenItem = results[i].stock_quantity;
        //                     // console.log("Quantiy  " + qChosenItem);
        //                     // itemQuantity();

        //                 }
        //                 else {
        //                     connection.end();
        //                 }


        //             }

        //         });
        // }

    });

}
