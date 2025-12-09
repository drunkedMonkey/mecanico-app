"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../features/auth/infrastructure/AuthController"));
const router = (0, express_1.Router)();
router.post('/login', AuthController_1.default.login);
router.post('/change-password', AuthController_1.default.changePassword);
exports.default = router;
