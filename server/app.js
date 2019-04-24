require('dotenv').config();

const express  = require('express');
const app      = express();
const cors     = require('cors');
const mongoose = require('mongoose');
const routes   = require('./routes');
const PORT     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || '-development';

mongoose.connect('mongodb://localhost/hacktiv-overflow' + NODE_ENV, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);

app.listen(PORT, () => {
    console.log('App listening on port: ' + PORT);
})
