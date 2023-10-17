const dotenv = require("dotenv");
const {consola} = require("consola");
const app = require("./api/index.js");

dotenv.config();

app.listen(3000, () => consola.info("Server is running at http://localhost:3000/graphql"));