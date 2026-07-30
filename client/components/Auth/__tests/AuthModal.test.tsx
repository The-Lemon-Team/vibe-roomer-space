import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AuthModal } from '../AuthModal';
import { useAuthStore } from '../../../store/useAuthStore';

// Mock useAuthStore
vi.mock('../../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('AuthModal Component (Isolated UI Tests)', () => {
  const mockLogin = vi.fn();
  const mockRegister = vi.fn();
  const mockSetAuthModalOpen = vi.fn();
  const mockSetAuthModalMode = vi.fn();
  const mockClearError = vi.fn();

  let storeState: any;

  beforeEach(() => {
    vi.clearAllMocks();

    storeState = {
      isAuthModalOpen: true,
      authModalMode: 'login',
      setAuthModalOpen: mockSetAuthModalOpen,
      setAuthModalMode: mockSetAuthModalMode,
      login: mockLogin,
      register: mockRegister,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    };

    (useAuthStore as any).mockImplementation(() => storeState);
  });

  it('renders login form by default', () => {
    render(<AuthModal />);

    // Header Title
    expect(screen.getByText('USER LOGIN')).toBeInTheDocument();
    expect(screen.getByText('[SYSTEM_AUTHENTICATION]')).toBeInTheDocument();

    // Inputs
    expect(screen.getByLabelText('EMAIL ADDRESS')).toBeInTheDocument();
    expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument();
    expect(screen.queryByLabelText('USERNAME')).not.toBeInTheDocument();

    // Submit Button
    expect(screen.getByRole('button', { name: '[EXECUTE_SIGN_IN]' })).toBeInTheDocument();
  });

  it('renders register form when authModalMode is register', () => {
    storeState.authModalMode = 'register';
    render(<AuthModal />);

    // Header Title
    expect(screen.getByText('REGISTER NEW PROFILE')).toBeInTheDocument();

    // Inputs
    expect(screen.getByLabelText('USERNAME')).toBeInTheDocument();
    expect(screen.getByLabelText('EMAIL ADDRESS')).toBeInTheDocument();
    expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument();

    // Submit Button
    expect(screen.getByRole('button', { name: '[CREATE]' })).toBeInTheDocument();
  });

  it('calls setAuthModalMode and clearError when switching tabs', async () => {
    const user = userEvent.setup();
    render(<AuthModal />);

    const registerTab = screen.getByRole('button', { name: '[REGISTER]' });
    await user.click(registerTab);

    expect(mockClearError).toHaveBeenCalled();
    expect(mockSetAuthModalMode).toHaveBeenCalledWith('register');
  });

  it('calls clearError when switching back to login tab', async () => {
    storeState.authModalMode = 'register';
    const user = userEvent.setup();
    render(<AuthModal />);

    const loginTab = screen.getByRole('button', { name: '[SIGN_IN]' });
    await user.click(loginTab);

    expect(mockClearError).toHaveBeenCalled();
    expect(mockSetAuthModalMode).toHaveBeenCalledWith('login');
  });

  it('submits login form with correct credentials', async () => {
    const user = userEvent.setup();
    render(<AuthModal />);

    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[EXECUTE_SIGN_IN]' });

    await user.type(emailInput, 'operator@viberoom.net');
    await user.type(passwordInput, 'secretpassword');
    await user.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith('operator@viberoom.net', 'secretpassword');
  });

  it('submits register form with correct fields', async () => {
    storeState.authModalMode = 'register';
    const user = userEvent.setup();
    render(<AuthModal />);

    const usernameInput = screen.getByLabelText('USERNAME');
    const emailInput = screen.getByLabelText('EMAIL ADDRESS');
    const passwordInput = screen.getByLabelText('PASSWORD');
    const submitButton = screen.getByRole('button', { name: '[CREATE]' });

    await user.type(usernameInput, 'cyber_operator');
    await user.type(emailInput, 'operator@viberoom.net');
    await user.type(passwordInput, 'secretpassword');
    await user.click(submitButton);

    expect(mockRegister).toHaveBeenCalledWith(
      'operator@viberoom.net',
      'cyber_operator',
      'secretpassword'
    );
  });

  it('disables submit button and shows loading state during authentication', () => {
    storeState.isLoading = true;
    render(<AuthModal />);

    const submitButton = screen.getByRole('button', { name: 'AUTHENTICATING...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('displays error messages when error exists', () => {
    storeState.error = 'Invalid credentials or user does not exist';
    render(<AuthModal />);

    const errorDiv = screen.getByText('[ERROR]: Invalid credentials or user does not exist');
    expect(errorDiv).toBeInTheDocument();
  });

  it('closes modal when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<AuthModal />);

    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    await user.click(closeButton);

    expect(mockSetAuthModalOpen).toHaveBeenCalledWith(false);
  });

  it('does not render the modal at all when isAuthModalOpen is false', () => {
    storeState.isAuthModalOpen = false;
    render(<AuthModal />);

    expect(screen.queryByText('USER LOGIN')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('EMAIL ADDRESS')).not.toBeInTheDocument();
  });
});
