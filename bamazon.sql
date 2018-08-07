DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE items (
    id INT(30) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(7,2) NOT NULL,
    stock_quantity INT(30) NOT NULL,
    PRIMARY KEY(id)
    );
    
SELECT * FROM items;

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "gaming", 299.99, 100),
("xboxOne X", "gaming", 499.99, 100);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUE ("iPhone X", "cellular", 999.99, 250),
("PS4 Pro", "gaming", 399.00, 125),
("samsung Galaxy s9", "cellular", 849.99, 150),
("gamingLaptop", "computing", 999.99, 25),
("appleWatch", "lifestyle", 399.99, 30),
("earPods", "lifestyle", 149.99, 50),
("appleTV", "lifestyle", 249.99, 75),
("gamingMonitor", "computing", 369.99, 80),
("keyboard", "computing", 124.99, 120),
("giftCard", "lifestyle", 25.00, 999); 
