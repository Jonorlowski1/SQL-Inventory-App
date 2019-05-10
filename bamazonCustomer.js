const mysql = require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");
const LINE_BREAK = chalk.red("=").repeat(30);

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
  promptUser();
};

// function placeOrder() {
// };

function promptUser() {
  // this means updating the SQL database to reflect the remaining quantity
  // once the update goes through, show the customer the total cost of their purchase.
  connection.query('SELECT * FROM products', function (err, res) {
    console.log('first select', res);
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'item',
          type: 'input',
          message: 'Please enter the ITEM NUMBER of the product you want to buy:',
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
        console.log(answer);
        // if (answer.qty <= res[answer.item - 1].stock_quantity) {
          // const matching = arr.filter()
          // if (matching[0].stock_quantity >= answer.qty)
          // log maching
          // placeOrder();
          connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [answer.qty, answer.item], function (err, response) {
            console.log(err);
            console.log(response);
          });
          // 'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
          //   [
          //     {
          //       stock_quantity: res[answer.item - 1].stock_quantity -= answer.qty
          //     },
          //     {
          //       item_id: res[answer.item].item_id
          //     }
          //   ]
          console.log(chalk.white('UPDATED TOTAL: ' + res[answer.item - 1].stock_quantity));
        // } else {
        //   console.log(chalk.red('INSUFFICIENT QUANTITY!'));
        // }
        // return answer;
      });
  });
};
