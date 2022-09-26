const express = require("express");
const authRouter= require("./Routes/auth")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter)

app.get("/", (req, res) => res.send("Hello Nitesh"));

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
