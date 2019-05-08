const mysql = require("mysql");
const chalk = require("chalk");
const lineBreak = chalk.red("=").repeat(70);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
  connection.end();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(chalk.blue(res[i].item_id) + ' | ' + chalk.white(res[i].product_name) + ' | ' + chalk.green(res[i].price));
    }
    console.log(lineBreak);
  });
}
