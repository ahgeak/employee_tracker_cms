DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) -- to hold department name
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role salary
    department_id INT, -- to hold reference to department role belongs to
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);
-- !! Check to see if I did the reference key portion correct

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30), -- to hold employee first name
    last_name VARCHAR(30), -- to hold employee last name
    role_id INT, -- to hold reference to employee role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL

    manager_id INT DEFAULT NULL, -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    
    -- !!  need connect manger_id to id
);
