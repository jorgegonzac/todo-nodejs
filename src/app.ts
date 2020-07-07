import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/todos";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DB_URI || '';

app.use(bodyParser.json());
app.use(routes);

mongoose
.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});