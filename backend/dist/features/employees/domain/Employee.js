"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor({ id = null, name, firstName, firstSurname, secondSurname, dni, email, phone, employeeCode, role = 'MECHANIC', password = null, passwordChanged = false, deletedAt = null }) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
        this.dni = dni;
        this.email = email;
        this.phone = phone;
        this.employeeCode = employeeCode;
        this.role = role;
        this.password = password;
        this.passwordChanged = passwordChanged;
        this.deletedAt = deletedAt;
    }
}
exports.Employee = Employee;
exports.default = Employee;
