const fs = require("fs");

fs.writeFileSync("./.env", `API = ${process.env.URL_API}\n`);