export interface EmployeeProps {
  id?: number | null;
  name: string;
  firstName?: string | null;
  firstSurname?: string | null;
  secondSurname?: string | null;
  dni?: string | null;
  email?: string | null;
  phone?: string | null;
  employeeCode?: string | null;
  role?: 'MECHANIC' | 'ADMIN' | 'BACKOFFICE';
  password?: string | null;
  passwordChanged?: boolean;
  deletedAt?: Date | null;
}

export class Employee {
  id?: number | null;
  name: string;
  firstName?: string | null;
  firstSurname?: string | null;
  secondSurname?: string | null;
  dni?: string | null;
  email?: string | null;
  phone?: string | null;
  employeeCode?: string | null;
  role: 'MECHANIC' | 'ADMIN' | 'BACKOFFICE';
  password?: string | null;
  passwordChanged: boolean;
  deletedAt?: Date | null;

  constructor({ id = null, name, firstName, firstSurname, secondSurname, dni, email, phone, employeeCode, role = 'MECHANIC', password = null, passwordChanged = false, deletedAt = null }: EmployeeProps) {
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

export default Employee;
