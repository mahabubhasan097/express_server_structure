const db = require('../models/db');

exports.getDepartmentsAndDesignations = (req, res) => {
    const getDepartmentsQuery = 'SELECT * FROM department';
    const getDesignationsQuery = 'SELECT * FROM designation';

    db.query(getDepartmentsQuery, (error, departments) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error fetching departments' });
        } else {
            db.query(getDesignationsQuery, (error, designations) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Error fetching designations' });
                } else {
                    res.json({ departments, designations });
                }
            });
        }
    });
};