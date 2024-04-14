let express = require("express");
let app = express();
const path = require("path");

const router = express.Router();

app.use(express.static(path.resolve(__dirname, "dist")));

console.log("t");

router.get("*", (req, res, next) => {
  console.log(path.resolve(__dirname, "dist/index.html"));
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.use("", router);

app.listen(3000);
