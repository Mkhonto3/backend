import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123',
    });
    expect(result).toBeDefined();
    expect(result.email).toBe('test@example.com');
  });

  it('should login a user', async () => {
    const result = await controller.login({
      email: 'test@example.com',
      password: 'test123',
    });
    expect(result).toBeDefined();
    expect(result.accessToken).toBeDefined();
  });
});
