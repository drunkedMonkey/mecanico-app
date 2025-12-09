import bcrypt from 'bcryptjs';

export class ChangePasswordUseCase {
  repository: any;

  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(userId: number, newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.repository.update(userId, {
      password: hashedPassword,
      passwordChanged: true
    });
  }
}
