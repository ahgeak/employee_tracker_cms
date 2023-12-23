DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) -- to hold department name
);

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role salary
    department_id INT, -- to hold reference to department role belongs to
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);
-- !! Check to see if I did the reference key portion correct

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30), -- to hold employee first name
    last_name VARCHAR(30), -- to hold employee last name
    role_id INT, -- to hold reference to employee role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,

    manager_id INT DEFAULT NULL, -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

-- There is something wrong with the way that I am referencing the manager_id. I need to make sure I am able to use a foreign key reference for the same table that I am currently on.
