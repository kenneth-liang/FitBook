const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const exercises = require("./routes/api/exercises");
const workouts = require("./routes/api/workouts");
const passport = require('passport');

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get('/', (req, res) => res.send('Hello World!'));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/exercises", exercises);
app.use("/api/workouts", workouts);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is runnning on port ${port}`));