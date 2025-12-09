"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor({ id, name, firstName, firstSurname, secondSurname, identifier, identifierType, address, email, phone, vehicles = [] }) {
        this.id = id;
        this.name = name;
        this.firstName = firstName ?? null;
        this.firstSurname = firstSurname ?? null;
        this.secondSurname = secondSurname ?? null;
        this.identifier = identifier ?? null;
        this.identifierType = identifierType ?? null;
        this.address = address ?? null;
        this.email = email;
        this.phone = phone;
        this.vehicles = vehicles;
    }
}
exports.default = Customer;
