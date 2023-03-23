const fs = require("fs");

fs.writeFileSync("./.env", `URL_API = ${process.env.URL_API}\n`);