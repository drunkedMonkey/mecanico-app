import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import PrismaEmployeeRepository from '../../employees/infrastructure/PrismaEmployeeRepository';

export class LoginUseCase {
  private repository: PrismaEmployeeRepository;

  constructor(repository: PrismaEmployeeRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string): Promise<{ token: string; user: any }> {
    const user = await this.repository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    if (user.deletedAt) {
      throw new Error('Usuario desactivado');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        passwordChanged: user.passwordChanged
      },
    };
  }
}
