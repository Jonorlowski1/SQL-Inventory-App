const mysql = require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");
const LINE_BREAK = chalk.red("=").repeat(70);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
  promptUser();
  connection.end();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    console.log(LINE_BREAK);
    for (let i = 0; i < res.length; i++) {
      console.log(
        chalk.blue(res[i].item_id) +
        " | " +
        chalk.white(res[i].product_name) +
        " | " +
        chalk.green(res[i].price)
      );
    }
    console.log(LINE_BREAK);
  });
};

function promptUser() {
  // if there is not enough inventory, display a phrase like insufficient quantity and then prevent the order from going through
  // if there IS enough inventory, fulfill the order
  // this means updating the SQL database to reflect the remaining quantity
  // once the update goes through, show the customer the total cost of their purchase.
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'item',
          type: 'input',
          message: 'Enter the ID NUMBER of the product you would like to buy:',
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: 'qty',
          type: 'input',
          message: 'How many would you like to purchase?',
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        console.log(res[answer.qty-1].product_name);
        // connection.query(
        // );
      });
  });
};
