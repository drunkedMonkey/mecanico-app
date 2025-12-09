"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyncBus {
    constructor() {
        this.handlers = new Map();
    }
    register(name, handler) {
        this.handlers.set(name, handler);
    }
    async dispatch(message) {
        const handler = this.handlers.get(message.type);
        if (!handler)
            throw new Error(`No handler registered for message type: ${message.type}`);
        return handler(message);
    }
}
const bus = new SyncBus();
exports.default = bus;
