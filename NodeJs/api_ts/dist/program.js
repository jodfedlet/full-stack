"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startUp_1 = require("./startUp");
let port = process.env.PORT || '3333';
startUp_1.default.app.listen(port, function () {
    console.log(`The api project is running at the port: ${port}`);
});
