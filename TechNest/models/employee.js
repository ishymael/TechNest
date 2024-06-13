const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
        
    },
    employeeid:{
        type: String,
        required: true

    },
    department:{
        type: String,
        required: true

    },
    location:{
        type: String,
        required: true

    }


}, {timestamps:true});

module.exports = mongoose.model('Employee', employeeSchema);
