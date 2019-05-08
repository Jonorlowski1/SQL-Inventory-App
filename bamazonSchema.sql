DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products
  (item_id INT AUTO_INCREMENT
 , product_name VARCHAR(255)
 , department_name VARCHAR(255)
 , price DECIMAL (6, 2)
 , stock_quantity INT
 , PRIMARY KEY (item_id)
);

INSERT INTO products 
  (product_name
 , department_name
 , price
 , stock_quantity
)
  VALUES
     ('Bookshelf', 'Furniture', 76.99, 12)
   , ('Laptop', 'Technology', 455.29, 4)
 	, ('Dress Shirt', 'Clothing', 29.00, 29)
 	, ('Cat Toy', 'Pets', 4.99, 114)
 	, ('PC Game', 'Technology', 45.99, 22)
 	, ('Basketball', 'Sports', 19.89, 10)
 	, ('Desk Chair', 'Furniture', 112.99, 3)
 	, ('Stocking Cap', 'Clothing', 31.23, 20)
 	, ('Dog Food', 'Pets', 69.89, 42)
 	, ('Car Tires', 'Automobile', 49.99, 88)
  ; 
  
SELECT * FROM products;