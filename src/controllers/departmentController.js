const db = require('../models/db');

exports.getDepartments = (req, res) => {
    const query = 'SELECT * FROM department';
    db.query(query, (error, result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.send(JSON.stringify({ error: 'Department not found' }));
        }
    });
};

exports.getDepartmentById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM department WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ error: 'Department not found' }));
            console.log(error);
        } else {
            if (result.length === 0) {
                res.send(JSON.stringify({ error: 'Department not found' }));
            } else {
                res.send(result[0]);
            }
        }
    });
};

exports.addDepartment = (req, res) => {
    const body = req.body;
    const { deptname } = body;
    const query = 'INSERT INTO department (department_name) VALUES (?)';
    const values = [deptname];
    db.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Department added successfully' }));
        }
    });
};

exports.updateDepartment = (req, res) => {
    const body = req.body;
    const { deptname } = body;
    const id = req.params.id;
    const query = `
                UPDATE department
                SET department_name = ?
                WHERE id = ?
            `;
    const values = [deptname, id];

    db.query(query, values, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: "Error Updating Depatment" }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Department Updated Successfully' }));
        }
    });
};

exports.deleteDepartment = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM department WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: "Error Deleting Depatment" }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Department deleted successfully' }));
        }
    });
};