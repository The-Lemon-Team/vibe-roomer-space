import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockAuthService = {
      register: vi.fn(),
      login: vi.fn(),
      refreshTokens: vi.fn(),
    };

    authController = new AuthController(mockAuthService);
  });

  describe('register', () => {
    it('should delegate user registration to authService', async () => {
      const registerDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com', username: 'testuser' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      mockAuthService.register.mockResolvedValueOnce(mockResult);

      const result = await authController.register(registerDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('login', () => {
    it('should delegate login to authService', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com', username: 'testuser' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      mockAuthService.login.mockResolvedValueOnce(mockResult);

      const result = await authController.login(loginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('refresh', () => {
    it('should delegate token refresh to authService', async () => {
      const refreshToken = 'some-refresh-token';
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com', username: 'testuser' },
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      };
      mockAuthService.refreshTokens.mockResolvedValueOnce(mockResult);

      const result = await authController.refresh(refreshToken);

      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith(refreshToken);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getMe', () => {
    it('should return user object wrapped in a response body', () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        username: 'testuser',
        role: 'USER',
      };

      const result = authController.getMe(mockUser);

      expect(result).toEqual({ user: mockUser });
    });
  });
});
