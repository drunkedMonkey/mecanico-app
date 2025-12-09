"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeController_1 = __importDefault(require("../features/employees/infrastructure/EmployeeController"));
const router = (0, express_1.Router)();
// GET /api/employees
router.get('/', (req, res) => EmployeeController_1.default.getEmployees(req, res));
// POST /api/employees
router.post('/', (req, res) => EmployeeController_1.default.createEmployee(req, res));
// PUT /api/employees/:id
router.put('/:id', (req, res) => EmployeeController_1.default.updateEmployee(req, res));
// DELETE /api/employees/:id (soft delete)
router.delete('/:id', (req, res) => EmployeeController_1.default.deleteEmployee(req, res));
// PATCH /api/employees/:id/restore
router.patch('/:id/restore', (req, res) => EmployeeController_1.default.restoreEmployee(req, res));
exports.default = router;
