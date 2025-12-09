"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeUpdateEmployeeHandler;
const UpdateEmployeeUseCase_1 = __importDefault(require("../UpdateEmployeeUseCase"));
function makeUpdateEmployeeHandler(repository) {
    const useCase = new UpdateEmployeeUseCase_1.default(repository);
    return async (message) => {
        return useCase.execute(message.id, message.payload);
    };
}
