"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeGetAppointmentsHandler;
const GetAppointmentsUseCase_1 = __importDefault(require("../GetAppointmentsUseCase"));
function makeGetAppointmentsHandler(repository) {
    const useCase = new GetAppointmentsUseCase_1.default(repository);
    return async (message) => {
        return useCase.execute(message.payload ?? {});
    };
}
