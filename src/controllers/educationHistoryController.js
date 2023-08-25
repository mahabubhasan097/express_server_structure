const db = require('../models/db');

exports.getEducationHistories = (req, res) => {
    const query = 'SELECT * FROM employees,eduhistories WHERE employees.id = eduhistories.emp_id';
    db.query(query, (error, result) => {
        if (result) {
            //console.log(result);
            res.send(result)
        }
        else {
            res.send(JSON.stringify({ error: 'Education history not found' }));
            console.log(error);
        }
    });
};

exports.getEducationHistoryById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM eduhistories WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (result) {
            //console.log(result);
            res.send(result)
        }
        else {
            res.send(JSON.stringify({ error: 'Education history not found' }));
            console.log(error);
        }
    });
};

exports.addEducationHistory = (req, res) => {
    const { empid, instituteName, degree, department, passingyear, gpa } = req.body;

    const insertQuery = 'INSERT INTO eduhistories (emp_id, institute, degree, department, passingyear, gpa) VALUES ?';
    const values = [];

    // Prepare values for multiple inserts
    for (let i = 0; i < empid.length; i++) {
        values.push([empid[i], instituteName[i], degree[i], department[i], passingyear[i], gpa[i]]);
    }
    console.log(values);

    db.query(insertQuery, [values], (err, result) => {
        if (err) {
            console.error('Error inserting education histories:', err);
            return res.status(500).json({ error: 'Failed to add education history' });
        }

        res.status(200).json({ message: 'Education history added successfully' });
    });
};

exports.updateEducationHistory = (req, res) => {
    const body = req.body;
    const { updateEHInstitute, updateEHdegree, updateEHDeptName, updateEHpassingyear, updateEHgpa } = body;
    const id = req.params.id;
    const query = `
                UPDATE eduhistories
                SET institute = ?, degree = ?, department = ?, passingyear = ?, gpa = ?
                WHERE id = ?
            `;
    const values = [updateEHInstitute, updateEHdegree, updateEHDeptName, updateEHpassingyear, updateEHgpa, id];

    db.query(query, values, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Education history update failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Education history updated successfully' }));
        }
    });
};

exports.deleteEducationHistory = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM eduhistories WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Education history delete failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Education history deleted successfully' }));
        }
    });
};

