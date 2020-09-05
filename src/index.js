
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const db = require('./database');


db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err))

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));



//Routes
app.use(require('./routes/index'));

//Start Database and Server
db.sync().done(() => {
    app.listen(app.get('port'), () => {
        console.log(`Server on Port ${app.get('port')}`);
    });

});





