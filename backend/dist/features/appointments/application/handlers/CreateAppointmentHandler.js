"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeCreateAppointmentHandler;
const CreateAppointmentUseCase_1 = __importDefault(require("../CreateAppointmentUseCase"));
function makeCreateAppointmentHandler(repository) {
    const useCase = new CreateAppointmentUseCase_1.default(repository);
    return async (message) => {
        return useCase.execute(message.payload);
    };
}
