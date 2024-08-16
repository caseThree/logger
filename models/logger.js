const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    computername: {
        type: String,
        required: false
    },
    forwhom: {
        type: String,
        required: true
    },
    whoami: {
        type: String,
        required: false 
    },
    ip: {
        type: String,
        required: false
    },
});

let Logger = mongoose.model('logger', schema);
module.exports = Logger;