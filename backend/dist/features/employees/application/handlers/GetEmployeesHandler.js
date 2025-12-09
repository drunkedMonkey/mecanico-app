"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeGetEmployeesHandler;
const GetEmployeesUseCase_1 = __importDefault(require("../GetEmployeesUseCase"));
function makeGetEmployeesHandler(repository) {
    const useCase = new GetEmployeesUseCase_1.default(repository);
    return async (message) => {
        return useCase.execute();
    };
}
