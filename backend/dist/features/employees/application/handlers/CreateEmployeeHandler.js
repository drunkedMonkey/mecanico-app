"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeCreateEmployeeHandler;
const CreateEmployeeUseCase_1 = __importDefault(require("../CreateEmployeeUseCase"));
function makeCreateEmployeeHandler(repository) {
    const useCase = new CreateEmployeeUseCase_1.default(repository);
    return async (message) => {
        return useCase.execute(message.payload);
    };
}
