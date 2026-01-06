"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
var adapter_pg_1 = require("@prisma/adapter-pg");
var client_1 = require("./generated/prisma/client");
// '../generated/prisma/client'
var connectionString = "".concat(process.env.DATABASE_URL);
console.log("DB CONNECTION STRING:", connectionString);
var adapter = new adapter_pg_1.PrismaPg({ connectionString: connectionString });
var prisma = new client_1.PrismaClient({ adapter: adapter });
exports.prisma = prisma;
