// Dependencies and initializations
const express = require('express');
const mongoose = require('mongoose');
const employee = require('./models/employee');

require('dotenv').config();

console.log(process.env.URI); 

// Express App setup
const app = express();

// Register EJS view engine
app.set('view engine', 'ejs');

// Connect to MongoDB using the URI from the .env file
const dbURI = process.env.URI;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000)) // listen for requests when DB connected
  .catch((err) => console.log(err));

// Middleware and static files
app.use(express.static('public'));  // used to serve static files like CSS
app.use(express.urlencoded({ extended: true }));  // used for parsing form data

// GET /employees:
app.get('/employees', (req, res) => {
  const searchQuery = req.query.search;
  let query = {};

  if (searchQuery) {
    query = {
      $or: [
        { fname: new RegExp(searchQuery, 'i') },
        { lname: new RegExp(searchQuery, 'i') },
        { employeeid: new RegExp(searchQuery, 'i') },
        { department: new RegExp(searchQuery, 'i') },
        { location: new RegExp(searchQuery, 'i') },
      ]
    };
  }

  employee.find(query).sort({ createdAt: -1 })
    .then((result) => {
      res.render('Employees', { title: 'Employees', employees: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST /employees:
app.post('/employees', (req, res) => {
  const emps = new employee(req.body);

  emps.save()
    .then((result) => {
      res.redirect('/employees');
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET /employees/:id:
app.get('/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  employee.findById(id)
    .then(result => {
      res.render('details', { emp: result, title: 'Employee Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

// DELETE /employees/:id:
app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  employee.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/employees' });
    })
    .catch(err => {
      console.log(err);
    });
});

// GET /index, /about, /contact, /addemp:
app.get('/index', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('AboutUs', { title: 'About Us' });
});

app.get('/contact', (req, res) => {
  res.render('Contact', { title: 'Contact Us' });
});

app.get('/addemp', (req, res) => {
  res.render('addemployee');
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('error', { title: 'Error' });
});
