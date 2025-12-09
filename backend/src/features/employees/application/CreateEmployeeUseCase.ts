import bcrypt from 'bcryptjs';

export class CreateEmployeeUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(data: any) {
    if (!data.name) throw new Error('Name is required');

    const hashedPassword = await bcrypt.hash('123456', 10);
    
    return this.repository.create({
      ...data,
      password: hashedPassword,
      passwordChanged: false
    });
  }
}

export default CreateEmployeeUseCase;
