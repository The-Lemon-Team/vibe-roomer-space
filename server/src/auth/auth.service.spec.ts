import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '../generated/client';
import * as bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let mockPrisma: any;
  let mockJwtService: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPrisma = {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    };

    mockJwtService = {
      sign: vi.fn(),
      verify: vi.fn(),
    };

    authService = new AuthService(mockPrisma, mockJwtService);
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    it('should throw ConflictException if email is already taken', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 'existing-id' });

      await expect(authService.register(registerDto)).rejects.toThrow(
        new ConflictException('User with this email already exists'),
      );
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if username is already taken', async () => {
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null) // Email check
        .mockResolvedValueOnce({ id: 'existing-id' }); // Username check

      await expect(authService.register(registerDto)).rejects.toThrow(
        new ConflictException('Username is already taken'),
      );
      expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(2);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('should successfully register a new user and return user details with tokens', async () => {
      const mockCreatedUser = {
        id: 'new-user-id',
        email: 'test@example.com',
        username: 'testuser',
        role: Role.USER,
        createdAt: new Date(),
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null) // Email check
        .mockResolvedValueOnce(null); // Username check

      vi.mocked(bcrypt.hash).mockResolvedValueOnce('hashed_password' as never);
      mockPrisma.user.create.mockResolvedValueOnce(mockCreatedUser);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await authService.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: registerDto.email,
          username: registerDto.username,
          password: 'hashed_password',
          role: Role.USER,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
        },
      });

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        user: mockCreatedUser,
        accessToken: 'mock-jwt-token',
        refreshToken: 'mock-jwt-token',
      });
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should throw UnauthorizedException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password'),
      );
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
    });

    it('should throw UnauthorizedException if password verification fails', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashed_password',
      });

      vi.mocked(bcrypt.compare).mockResolvedValueOnce(false as never);

      await expect(authService.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password'),
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, 'hashed_password');
    });

    it('should successfully login and return user details with tokens', async () => {
      const mockDbUser = {
        id: 'user-id',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashed_password',
        role: Role.USER,
        createdAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValueOnce(mockDbUser);
      vi.mocked(bcrypt.compare).mockResolvedValueOnce(true as never);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await authService.login(loginDto);

      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, 'hashed_password');
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        user: {
          id: mockDbUser.id,
          email: mockDbUser.email,
          username: mockDbUser.username,
          role: mockDbUser.role,
          createdAt: mockDbUser.createdAt,
        },
        accessToken: 'mock-jwt-token',
        refreshToken: 'mock-jwt-token',
      });
    });
  });

  describe('refreshTokens', () => {
    const refreshToken = 'valid-refresh-token';

    it('should throw UnauthorizedException if jwt verification fails', async () => {
      mockJwtService.verify.mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.refreshTokens(refreshToken)).rejects.toThrow(
        new UnauthorizedException('Refresh token is invalid or expired'),
      );
    });

    it('should throw UnauthorizedException if user does not exist in database', async () => {
      mockJwtService.verify.mockReturnValueOnce({ sub: 'non-existent-id' });
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(authService.refreshTokens(refreshToken)).rejects.toThrow(
        new UnauthorizedException('Refresh token is invalid or expired'),
      );
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
        select: { id: true, email: true, username: true, role: true, createdAt: true },
      });
    });

    it('should successfully refresh tokens and return new credentials', async () => {
      const mockPayload = { sub: 'user-id', email: 'test@example.com', role: Role.USER };
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        username: 'testuser',
        role: Role.USER,
        createdAt: new Date(),
      };

      mockJwtService.verify.mockReturnValueOnce(mockPayload);
      mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);
      mockJwtService.sign.mockReturnValue('new-mock-jwt-token');

      const result = await authService.refreshTokens(refreshToken);

      expect(mockJwtService.verify).toHaveBeenCalledWith(refreshToken);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        user: mockUser,
        accessToken: 'new-mock-jwt-token',
        refreshToken: 'new-mock-jwt-token',
      });
    });
  });
});
