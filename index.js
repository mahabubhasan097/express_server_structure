const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

//routes
const generalRoutes = require('./src/routes/generalRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const departmenRoutes = require('./src/routes/departmentRoutes');
const designationRoutes = require('./src/routes/designationRoutes');
const jobHistoryRoutes = require('./src/routes/jobHistoryRoutes');
const educationHistoryRoutes = require('./src/routes/educationHistoryRoutes');

app.use(generalRoutes);
app.use(employeeRoutes);
app.use(departmenRoutes);
app.use(designationRoutes);
app.use(jobHistoryRoutes);
app.use(educationHistoryRoutes);

app.get('/', (req, res) => {
    res.send('EMS Running');
});

app.listen(port, () => {
    console.log(`EMS is running on port ${port}`);
});