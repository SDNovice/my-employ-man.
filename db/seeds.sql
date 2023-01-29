INSERT INTO departments (id, name)
VALUES 
    (1, "Head Department");

SELECT * FROM departments;

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (1, "Manager", 100000.00, 1);

SELECT * FROM roles;

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Sean", "Yanez", 1, 1);

SELECT * FROM employees;