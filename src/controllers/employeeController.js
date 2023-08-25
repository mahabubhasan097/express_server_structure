const db = require('../models/db')

exports.getEmployees = (req, res) => {
    const query = 'SELECT employees.id, employees.name, employees.email, employees.phone, employees.nid, employees.dob, employees.blood_group, department.department_name, designation.designation_name FROM employees,department,designation WHERE employees.department_id = department.id AND employees.designation_id = designation.id';
    db.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error fetching employees' });
        } else {
            res.json(result);
        }
    });
};

exports.getEmployeeById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM employees, empaddresses WHERE employees.id = empaddresses.emp_id AND  employees.id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result.length === 0) {
                res.send(JSON.stringify({ error: 'Employee not found' }));
            } else {
                res.send(result);
            }
        }
    });
};

exports.addEmployee = (req, res) => {
    const body = req.body;
    let empid = [];
    const { name, email, phone, nid, dob, bloodg, designation, department, addressType, streetAddress, state, city, postalCode, country } = body;
    const query = 'INSERT INTO employees (name, email, phone, nid, dob, blood_group, designation_id, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, phone, nid, dob, bloodg, designation, department];
    db.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const employeeId = result.insertId;
            const insertAddressQuery = 'INSERT INTO empaddresses (emp_id,address_type, street_address, state, city, postal,country) VALUES ?';
            const values = [];

            // Prepare values for multiple inserts
            for (let i = 0; i < addressType.length; i++) {
                empid[i] = employeeId;
                values.push([empid[i], addressType[i], streetAddress[i], state[i], city[i], postalCode[i], country[i]]);
            }
            db.query(insertAddressQuery, [values], (error, result) => {
                if (error) {
                    console.log(error);
                }
                res.send(JSON.stringify({ message: 'Employee added successfully' }));
            })
        }
    });
};

exports.updateEmployee = (req, res) => {
    const body = req.body;
    const {
        name, email, phone, nid, dob, bloodg, designation, department,
        addressType, streetAddress, state, city, postalCode, country
    } = body;
    const employee_id = req.params.id;

    const updateEmployeeQuery = `
        UPDATE employees
        SET name = ?, email = ?, phone = ?, nid = ?, dob = ?, blood_group = ?, designation_id = ?, department_id = ?
        WHERE id = ?
    `;
    const updateEmployeeValues = [name, email, phone, nid, dob, bloodg, designation, department, employee_id];

    db.query(updateEmployeeQuery, updateEmployeeValues, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(JSON.stringify({ message: 'Error updating employee' }));
        } else {
            const updateAddressQuery = `
                UPDATE empaddresses
                SET street_address = ?, state = ?, city = ?, postal = ?, country = ?
                WHERE emp_id = ? AND address_type = ?
            `;

            // Iterate through the arrays to update each address separately
            for (let i = 0; i < addressType.length; i++) {
                const updateAddressValues = [
                    streetAddress[i], state[i], city[i], postalCode[i], country[i],
                    employee_id, addressType[i]
                ];

                // Check if an address with the same type exists for the employee
                const checkAddressQuery = `
                    SELECT COUNT(*) AS count
                    FROM empaddresses
                    WHERE emp_id = ? AND address_type = ?
                `;
                const checkAddressValues = [employee_id, addressType[i]];

                db.query(checkAddressQuery, checkAddressValues, (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        if (result[0].count > 0) {
                            // Update existing address
                            db.query(updateAddressQuery, updateAddressValues, (error, result) => {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        } else {
                            // Insert new address
                            const insertAddressQuery = `
                                INSERT INTO empaddresses (emp_id, address_type, street_address, state, city, postal, country)
                                VALUES (?, ?, ?, ?, ?, ?, ?)
                            `;
                            const insertAddressValues = [
                                employee_id, addressType[i], streetAddress[i], state[i], city[i], postalCode[i], country[i]
                            ];

                            db.query(insertAddressQuery, insertAddressValues, (error, result) => {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        }
                    }
                });
            }

            res.send(JSON.stringify({ message: 'Employee updated successfully' }));
        }
    });
};

exports.deleteEmployee = () => {
    const id = req.params.id;
    const deleteAddressesQuery = 'DELETE FROM empaddresses WHERE emp_id = ?';
    const deleteJobHistoriesQuery = 'DELETE FROM jobhistories WHERE emp_id = ?';
    const deleteEduHistoriesQuery = 'DELETE FROM eduhistories WHERE emp_id = ?';
    const deleteEmployeeQuery = 'DELETE FROM employees WHERE id = ?';
    db.query(deleteAddressesQuery, [id], (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to delete addresses' });
        } else {
            db.query(deleteJobHistoriesQuery, [id], (error) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Failed to delete job histories' });
                } else {
                    db.query(deleteEduHistoriesQuery, [id], (error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ error: 'Failed to delete eduhistory' });
                        } else {
                            db.query(deleteEmployeeQuery, [id], (error) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json({ error: 'Failed to delete employee' });
                                } else {
                                    res.status(200).json({ message: 'Employee and related data deleted successfully' });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

