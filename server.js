// Imports
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();
cwd = process.cwd();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starts server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
