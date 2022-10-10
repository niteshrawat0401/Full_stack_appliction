const express = require("express");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user")
const connect = require("./db/db");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter)

app.get("/", (req, res) => res.send("Hello Nitesh"));

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  connect;
  console.log("Server started on http://localhost:8080");
});
