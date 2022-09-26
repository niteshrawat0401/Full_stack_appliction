const express = require("express");
const authRouter= require("./Routes/auth")
const connect= require("./db/db")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter)

app.get("/", (req, res) => res.send("Hello Nitesh"));

app.listen(8080, () => {
  connect
  console.log("Server started on http://localhost:8080");
});
