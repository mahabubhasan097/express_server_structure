const db = require('../models/db');

exports.getDesignations = (req, res) => {
    const query = 'SELECT * FROM designation';
    db.query(query, (error, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(JSON.stringify({ error: 'Designation not found' }));
            console.log(error);
        }
    });
};

exports.getDesignationById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM designation WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ error: 'Designation not found' }));
            console.log(error);
        } else {
            if (result.length === 0) {
                res.send(JSON.stringify({ error: 'Designation not found' }));
            } else {
                res.send(result[0]);
            }
        }
    });
};

exports.addDesignation = (req, res) => {
    const body = req.body;
    const { desgname } = body;
    const query = 'INSERT INTO designation (designation_name) VALUES (?)';
    const values = [desgname];
    db.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ message: 'Designation already exists.' }));
        } else {
            res.send(JSON.stringify({ message: 'Designation added successfully' }));
        }
    });
};

exports.updateDesignation = (req, res) => {
    const body = req.body;
    const { desgname } = body;
    const id = req.params.id;
    const query = `
                UPDATE designation
                SET designation_name = ?
                WHERE id = ?
            `;
    const values = [desgname, id];

    db.query(query, values, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Designation update failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Designation updated successfully' }));
        }
    });
};

exports.deleteDesignation = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM designation WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Designation delete failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Designation deleted successfully' }));
        }
    });
};