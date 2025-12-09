"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_routes_1 = __importDefault(require("./appointments.routes"));
const employees_routes_1 = __importDefault(require("./employees.routes"));
const customers_routes_1 = __importDefault(require("./customers.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router = (0, express_1.Router)();
router.use('/appointments', appointments_routes_1.default);
router.use('/employees', employees_routes_1.default);
router.use('/customers', customers_routes_1.default);
router.use('/auth', auth_routes_1.default);
exports.default = router;
