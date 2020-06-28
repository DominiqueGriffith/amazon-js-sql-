DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);
INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "GSH","Gucci Shirt","Clothing", 100, 3);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "GSK","Gucci Skirt","Clothing", 200, 2);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "CD","Celine Dress","Clothing", 1000, 1);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "ROS","Rick Owens Sneakers","Shoes", 500, 2);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "PMG","Pyer Moss Gown","Clothing", 3000, 1);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "PP","Prada Pants","Clothing", 300, 5);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "DB","Dior Bag","Accessories", 1300, 2);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "GE","Givenchy Earings","Accessories", 200, 2);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "MMS","Maison Margiela Shoes","Shoes", 400, 5);

INSERT INTO products (id , item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "AQH","Alexander McQueen Headpiece","Accessories", 2000, 1);

