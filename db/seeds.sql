-- Add last table seeds
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 4, 100000),
       ("Sales Person", 4, 80000),
       ("Lead Engineer", 1, 150000),
       ("Software Engineer", 1, 120000),
       ("Account Manager", 2, 160000),
       ("Accountant", 2, 125000),
       ("Legal Team Lead", 3, 250000),
       ("Lawyer", 3, 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Erik", "Smith", 3, 1),
       ("Rachel", "Edwards", 4, 2),
       ("Isabel", "Anders", 2, 1);