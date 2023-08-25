const db = require('../models/db');

exports.getJobHistories = (req, res) => {
    const query = 'SELECT * FROM employees,jobhistories WHERE employees.id = jobhistories.emp_id';
    db.query(query, (error, result) => {
        if (result) {
            //console.log(result);
            res.send(result)
        }
        else {
            res.send(JSON.stringify({ error: 'Job history not found' }));
            console.log(error);
        }
    });
};

exports.getJobHistoryById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM jobhistories WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (result) {
            //console.log(result);
            res.send(result)
        }
        else {
            res.send(JSON.stringify({ error: 'Job history not found' }));
            console.log(error);
        }
    });
};

exports.addJobHistory = (req, res) => {
    const { empid, companyName, departmentName, positionName, jobStarted, jobEnded, jobDesc } = req.body;

    const insertQuery = 'INSERT INTO jobhistories (emp_id, company_name, department, position, job_started, job_ended, job_description) VALUES ?';
    const values = [];

    // Prepare values for multiple inserts
    for (let i = 0; i < empid.length; i++) {
        values.push([empid[i], companyName[i], departmentName[i], positionName[i], jobStarted[i], jobEnded[i], jobDesc[i]]);
    }

    db.query(insertQuery, [values], (err, result) => {
        if (err) {
            console.error('Error inserting job histories:', err);
            res.status(500).json({ error: 'Failed to add job history' });
        }

        res.status(200).json({ message: 'Job history added successfully' });
    });
};

exports.updateJobHistory = (req, res) => {
    const body = req.body;
    const { updateJHCompanyName, updateJHDeptName, updateJHPosition, updateJHJobStarted, updateJHJobEnded, updateJHJobDesc } = body;
    const id = req.params.id;
    const query = `
                UPDATE jobhistories
                SET company_name = ?, department = ?, position = ?, job_started = ?, job_ended = ?, job_description = ?
                WHERE id = ?
            `;
    const values = [updateJHCompanyName, updateJHDeptName, updateJHPosition, updateJHJobStarted, updateJHJobEnded, updateJHJobDesc, id];

    db.query(query, values, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Job history update failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Job history updated successfully' }));
        }
    });
};

exports.deleteJobHistory = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM jobhistories WHERE id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ message: 'Job history deleted failed' }));
            console.log(error);
        } else {
            res.send(JSON.stringify({ message: 'Job history deleted successfully' }));
        }
    });
}