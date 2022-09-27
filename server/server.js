const express = require("express");
const authRouter= require("./Routes/auth")
const connect= require("./db/db")
const cors= require("cors");

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"]
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter)

app.get("/", (req, res) => res.send("Hello Nitesh"));

app.listen(8080, async() => {
  await connect
  console.log("Server started on http://localhost:8080");
});
