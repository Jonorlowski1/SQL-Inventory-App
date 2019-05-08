const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  // displayProducts();
  connection.end();
});

// function displayProducts() {

// };