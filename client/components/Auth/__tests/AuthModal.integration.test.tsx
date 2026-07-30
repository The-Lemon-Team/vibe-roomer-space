import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthModal } from '../AuthModal';
import { useAuthStore } from '../../../store/useAuthStore';

describe('AuthModal Integration Tests (Real Store & Mocked API)', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', mockFetch);
    
    // Clear localStorage
    localStorage.clear();

    // Reset Zustand store to clean initial state
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isAuthModalOpen: true,
      authModalMode: 'login',
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('performs a successful login flow', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    const mockUserResponse = {
      user: {
        id: 'user-777',
        email: 'operator@viberoom.net',
        username: 'cyber_operator',
        role: 'USER',
      },
      accessToken: 'access-token-xyz',
      refreshToken: 'refresh-token-xyz',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockUserResponse),
    });

    render(<AuthModal />);

    // Fill the inputs
    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[EXECUTE_SIGN_IN]' });

    await user.type(emailInput, 'operator@viberoom.net');
    await user.type(passwordInput, 'cybersecure');
    await user.click(submitButton);

    // Assert that the global fetch was called correctly
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'operator@viberoom.net', password: 'cybersecure' }),
        })
      );
    });

    // Assert that store is updated and saved in localStorage
    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUserResponse.user);
      expect(state.accessToken).toBe('access-token-xyz');
      expect(state.isAuthModalOpen).toBe(false);

      expect(localStorage.getItem('vibe_access_token')).toBe('access-token-xyz');
      expect(localStorage.getItem('vibe_refresh_token')).toBe('refresh-token-xyz');
      expect(JSON.parse(localStorage.getItem('vibe_user') || '{}')).toEqual(mockUserResponse.user);
    });

    // Assert modal is closed in UI
    expect(screen.queryByText('USER LOGIN')).not.toBeInTheDocument();
  });

  it('handles and displays error on failed login', async () => {
    const user = userEvent.setup();

    // Mock failed API response
    const mockErrorResponse = {
      message: 'Invalid credentials. Password verification failed.',
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: () => Promise.resolve(mockErrorResponse),
    });

    render(<AuthModal />);

    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[EXECUTE_SIGN_IN]' });

    await user.type(emailInput, 'operator@viberoom.net');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Wait for error to render
    const errorAlert = await screen.findByText('[ERROR]: Invalid credentials. Password verification failed.');
    expect(errorAlert).toBeInTheDocument();

    // Assert that store reflects error state
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid credentials. Password verification failed.');
    expect(state.isAuthModalOpen).toBe(true);
    expect(localStorage.getItem('vibe_access_token')).toBeNull();
  });

  it('performs a successful registration flow', async () => {
    const user = userEvent.setup();

    // Mock successful registration API response
    const mockUserResponse = {
      user: {
        id: 'user-888',
        email: 'new_operator@viberoom.net',
        username: 'neon_rider',
        role: 'USER',
      },
      accessToken: 'access-token-new',
      refreshToken: 'refresh-token-new',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: () => Promise.resolve(mockUserResponse),
    });

    // Set store mode to register
    useAuthStore.setState({ authModalMode: 'register' });

    render(<AuthModal />);

    const usernameInput = screen.getByLabelText('USERNAME');
    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[CREATE]' });

    await user.type(usernameInput, 'neon_rider');
    await user.type(emailInput, 'new_operator@viberoom.net');
    await user.type(passwordInput, 'neonpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'new_operator@viberoom.net',
            username: 'neon_rider',
            password: 'neonpassword',
          }),
        })
      );
    });

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUserResponse.user);
      expect(state.isAuthModalOpen).toBe(false);

      expect(localStorage.getItem('vibe_access_token')).toBe('access-token-new');
      expect(localStorage.getItem('vibe_user')).toContain('neon_rider');
    });

    expect(screen.queryByText('REGISTER NEW PROFILE')).not.toBeInTheDocument();
  });

  it('handles and displays error on failed registration', async () => {
    const user = userEvent.setup();

    // Mock validation error
    const mockErrorResponse = {
      message: ['username must be longer than or equal to 3 characters', 'email must be an email'],
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: () => Promise.resolve(mockErrorResponse),
    });

    useAuthStore.setState({ authModalMode: 'register' });

    render(<AuthModal />);

    const usernameInput = screen.getByLabelText('USERNAME');
    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[CREATE]' });

    await user.type(usernameInput, 'xy');
    await user.type(emailInput, 'xy@viberoom.net');
    await user.type(passwordInput, 'short');
    await user.click(submitButton);

    // Wait for joined error messages (split by comma in services/api.ts)
    const expectedErrorText = '[ERROR]: username must be longer than or equal to 3 characters, email must be an email';
    const errorAlert = await screen.findByText(expectedErrorText);
    expect(errorAlert).toBeInTheDocument();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('username must be longer than or equal to 3 characters, email must be an email');
    expect(state.isAuthModalOpen).toBe(true);
  });
});
