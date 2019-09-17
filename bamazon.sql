DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  dept_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  instock INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("fishing-line", "Sporting Goods", 2.50, 100);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("toy car", "Toys", 1.30, 10);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("screwdriver", "Tools", 8.00, 7);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("hangers", "Home Goods", .70, 10);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("barbie", "Toys", 13.00, 5);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("GIJOE", "Toys", 13.00, 5);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("TV", "Electronics", 300.50, 1);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("Nintendo", "Electronics", 400.00, 0);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("crackers", "grocery", 1.50, 50);

INSERT INTO products (product_name, dept_name, price, instock)
VALUES ("towels", "Home Goods", 3.50, 15);