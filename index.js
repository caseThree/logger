if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const Logger = require('./models/logger')

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Database Connected")).catch((err) => console.log("Unable to connect to the databse. Error: " + err));

app.use(cookieParser()); 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const computerName = req.query.name;
        const whoami = req.query.whoami;
        const forwhom = req.query.forwhom;
        const ip = req.ip;
        
        const newUser = new Logger({
            computername: computerName,
            forwhom: forwhom,
            whoami: whoami,
            ip: ip,
        });
        newUser.save()
        .then(_ => console.log("DONE SAVING"))
        .catch(err => console.log(`CRASHED SAVING: ${err}`))
    } catch(e) {
        console.log(e)
    } finally {
        res.send("OK")
    } 
})

app.listen(process.env.PORT || 80, () => console.log("Running"));