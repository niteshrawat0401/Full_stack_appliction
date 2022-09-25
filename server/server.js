const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("Hello Nitesh"));

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
