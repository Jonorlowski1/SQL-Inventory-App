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
    // console.log('first select', res);
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
        const userQtyRqst = answer.qty;
        const userItemId = answer.item;

        const matchingArr = res.filter(function (number) {
          // console.log('number', number);
          return number.item_id == userItemId
        })

        const price = matchingArr[0].price;
        const inventory = matchingArr[0].stock_quantity;
        // console.log(number);
        // console.log('matchingArr', matchingArr[0])
        // console.log('answer.item', answer.item)
        if (inventory >= userQtyRqst) {
          // log maching
          connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [userQtyRqst, userItemId], function (err, response) {
            // console.log(err);
            // console.log(response);
            console.log(chalk.white('UPDATED INVENTORY: ', inventory));
          });
          // return answer;
        } else {
          console.log(chalk.red('INSUFFICIENT QUANTITY!'));
        }
      });
  });
};
