const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const dbConfig = require('./config/config');
const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/api', routes);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});