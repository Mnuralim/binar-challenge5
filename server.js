const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
