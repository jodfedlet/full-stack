"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { buildSchema } = require('graphql');
const newsTypes_1 = require("./types/newsTypes");
const schema = buildSchema(newsTypes_1.default);
exports.default = schema;
