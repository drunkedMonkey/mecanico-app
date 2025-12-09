"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController_1 = __importDefault(require("../features/customers/infrastructure/CustomerController"));
const router = (0, express_1.Router)();
router.get('/', CustomerController_1.default.getCustomers);
router.post('/', CustomerController_1.default.createCustomer);
router.put('/:id', CustomerController_1.default.updateCustomer);
router.delete('/:id', CustomerController_1.default.deleteCustomer);
router.post('/:id/vehicles', CustomerController_1.default.addVehicle);
router.delete('/:id/vehicles/:vehicleId', CustomerController_1.default.deleteVehicle);
exports.default = router;
