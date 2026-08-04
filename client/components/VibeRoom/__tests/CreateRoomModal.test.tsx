import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CreateRoomModal } from '../CreateRoomModal';
import { useAtmosphericStore } from '../../../store/useAtmosphericStore';
import { useAuthStore } from '../../../store/useAuthStore';

// Mock the Zustand stores
vi.mock('../../../store/useAtmosphericStore', () => ({
  useAtmosphericStore: vi.fn(),
  parseHashRoute: vi.fn(() => ({
    viewMode: 'rooms',
    tag: '#ALL',
    tagMode: 'live',
  })),
  updateHashRoute: vi.fn(),
  FEED_SCOPE_OPTIONS: [],
  isFeedScope: vi.fn(),
  isLiveFeedGroup: vi.fn(),
}));

vi.mock('../../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('CreateRoomModal Component', () => {
  // Store mock actions
  const mockSetCreateRoomModalOpen = vi.fn();
  const mockCreateRoomFromVibe = vi.fn();
  const mockCreateStandaloneRoom = vi.fn();
  const mockSetAuthModalOpen = vi.fn();

  // Store mock states
  let atmosphericStoreState: any;
  let authStoreState: any;

  beforeEach(() => {
    vi.clearAllMocks();

    atmosphericStoreState = {
      isCreateRoomModalOpen: true,
      vibeToCreateRoom: null,
      selectedVibePage: null,
      setCreateRoomModalOpen: mockSetCreateRoomModalOpen,
      createRoomFromVibe: mockCreateRoomFromVibe,
      createStandaloneRoom: mockCreateStandaloneRoom,
      vibes: [],
      pinnedTags: ['#ambient', '#coding'],
      topHashtags: ['#ambient', '#coding', '#chill'],
    };

    authStoreState = {
      isAuthenticated: true,
      setAuthModalOpen: mockSetAuthModalOpen,
    };

    (useAtmosphericStore as any).mockImplementation(() => atmosphericStoreState);
    (useAuthStore as any).mockImplementation(() => authStoreState);
  });

  it('renders with default form fields when vibeToCreateRoom is null (standalone room)', () => {
    render(<CreateRoomModal />);

    expect(screen.getByText('[ CREATE STREAM ROOM ]')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. NEON LOFI STREAM ROOM')).toHaveValue('NEON STREAM ROOM');
    expect(screen.getByPlaceholderText('Atmospheric audio/video stream description...')).toHaveValue('');
    expect(screen.getByPlaceholderText('Default: Empty -> Standard Black Cells Grid')).toHaveValue('');
  });

  it('populates fields based on starter vibe if vibeToCreateRoom is set', () => {
    atmosphericStoreState.vibeToCreateRoom = {
      id: 'vibe-123',
      title: 'Synthwave Chill Room',
      content: 'A super cozy synthwave lounge',
      tags: ['#synthwave', '#relax'],
      roomConfig: {
        themeColor: '#BD00FF',
        bgImageUrl: 'https://example.com/synthwave.jpg',
      },
    };

    render(<CreateRoomModal />);

    expect(screen.getByText('★ Synthwave Chill Room')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. NEON LOFI STREAM ROOM')).toHaveValue('ROOM :: Synthwave Chill Room');
    expect(screen.getByPlaceholderText('Atmospheric audio/video stream description...')).toHaveValue('A super cozy synthwave lounge');
    expect(screen.getByPlaceholderText('Default: Empty -> Standard Black Cells Grid')).toHaveValue('https://example.com/synthwave.jpg');
  });

  it('changing Title / Description and Visibility affects form state and submits correctly', async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal />);

    const titleInput = screen.getByPlaceholderText('e.g. NEON LOFI STREAM ROOM');
    const descriptionInput = screen.getByPlaceholderText('Atmospheric audio/video stream description...');

    // Change Title and Description
    await user.clear(titleInput);
    await user.type(titleInput, 'CUSTOM WORKSTREAM');
    await user.type(descriptionInput, 'Work stream description text.');

    // Choosing public / private variant
    const privateBtn = screen.getByText('PRIVATE ROOM');
    await user.click(privateBtn);

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /LAUNCH STREAM ROOM/i });
    await user.click(submitBtn);

    expect(mockCreateStandaloneRoom).toHaveBeenCalledWith({
      title: 'CUSTOM WORKSTREAM',
      description: 'Work stream description text.',
      poster: undefined,
      isPublic: false,
      tags: ['#stream', '#lofi', '#ambient'],
      roomConfig: {
        themeColor: '#00F0FF',
        bgImageUrl: undefined,
      },
    });
    expect(mockSetCreateRoomModalOpen).toHaveBeenCalledWith(false);
  });

  it.skip('changing color affects the form state', async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal />);

    // Click 'Amber' theme color
    const amberColorBtn = screen.getByTitle('Amber');
    await user.click(amberColorBtn);

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /LAUNCH STREAM ROOM/i });
    await user.click(submitBtn);

    expect(mockCreateStandaloneRoom).toHaveBeenCalledWith(
      expect.objectContaining({
        roomConfig: {
          themeColor: '#FFB000',
          bgImageUrl: undefined,
        },
      })
    );
  });

  describe('HashtagTag selector', () => {
    it('supports searching, adding, and deleting tags', async () => {
      const user = userEvent.setup();
      render(<CreateRoomModal />);

      // Find input tag element
      const tagInput = screen.getByPlaceholderText('+ Add tag...');
      const selectBox = tagInput.parentElement!;

      // Focus and change input value using fireEvent to be safe with jsdom event delegation
      fireEvent.focus(tagInput);
      fireEvent.change(tagInput, { target: { value: 'cod' } });

      // Check dropdown shows filtered suggestions
      expect(await screen.findByText('[ SUGGESTED TAGS (1) ]')).toBeInTheDocument();
      const suggestCodingBtn = screen.getByText('#coding').closest('button');
      expect(suggestCodingBtn).toBeInTheDocument();

      // Click suggested tag to add to selected list
      if (suggestCodingBtn) {
        await user.click(suggestCodingBtn);
      }
      expect(within(selectBox).getByText('#coding')).toBeInTheDocument();

      // Typing a new custom tag and pressing Enter to add it
      await user.type(tagInput, 'retro');
      fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' });
      expect(within(selectBox).getByText('#retro')).toBeInTheDocument();

      // Delete a tag from the selected list
      const lofiTagSpan = within(selectBox).getByText('#lofi').parentElement;
      const deleteLofiBtn = lofiTagSpan?.querySelector('button');
      expect(deleteLofiBtn).toBeInTheDocument();
      if (deleteLofiBtn) {
        await user.click(deleteLofiBtn);
      }
      expect(within(selectBox).queryByText('#lofi')).not.toBeInTheDocument();
    });
  });

  describe('Unsplash Image Search and presets integration', () => {
    let originalFetch: any;

    beforeEach(() => {
      originalFetch = globalThis.fetch;
    });

    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it('searches Unsplash and allows choosing a background image', async () => {
      const user = userEvent.setup();
      
      // Mock Unsplash API Response
      const mockPhotos = {
        results: [
          {
            id: 'photo-1',
            urls: {
              regular: 'https://images.unsplash.com/photo-1-regular.jpg',
              thumb: 'https://images.unsplash.com/photo-1-thumb.jpg',
            },
            alt_description: 'cool cyber scene',
            user: { name: 'Alice Cyber' },
          },
        ],
      };
      
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPhotos),
        })
      );
      globalThis.fetch = mockFetch;

      render(<CreateRoomModal />);

      // Open Background Image Modal
      const openModalBtn = screen.getByText(/CHOOSE THEME/i);
      await user.click(openModalBtn);

      // Verify Modal Title
      expect(screen.getByText('[ SELECT BACKGROUND THEME ]')).toBeInTheDocument();

      // Switch to Unsplash Search tab
      const unsplashTabBtn = screen.getByRole('button', { name: /Unsplash Search/i });
      await user.click(unsplashTabBtn);

      // Search input and trigger search
      const searchInput = screen.getByPlaceholderText(/Search aesthetic/i);
      const searchBtn = screen.getByRole('button', { name: 'Search' });

      await user.type(searchInput, 'neon cyber');
      await user.click(searchBtn);

      // Check fetch call options (support tags/query for searching)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/media/unsplash/search?query=neon%20cyber'),
        expect.any(Object)
      );

      // Verify search results are displayed
      const searchResultImg = await screen.findByAltText('cool cyber scene');
      expect(searchResultImg).toBeInTheDocument();

      // Initially, it should not have a checkmark icon text "check"
      const photoBtn = searchResultImg.closest('button');
      expect(within(photoBtn!).queryByText('check')).not.toBeInTheDocument();

      // Select image from results
      await user.click(searchResultImg);

      // Verify that the main form displays the background preview
      const previewImg = screen.getByAltText('Background Preview');
      expect(previewImg).toBeInTheDocument();
      expect(previewImg).toHaveAttribute('src', 'https://images.unsplash.com/photo-1-regular.jpg');

      // Reopen the modal to check it shows as currently configured background and has the checkmark
      await user.click(openModalBtn);

      // Verify currently configured background preview is present in the modal
      const modalPreviewImg = screen.getByAltText('Current Theme');
      expect(modalPreviewImg).toBeInTheDocument();
      expect(modalPreviewImg).toHaveAttribute('src', 'https://images.unsplash.com/photo-1-regular.jpg');

      // Go to Unsplash Search tab
      await user.click(screen.getByRole('button', { name: /Unsplash Search/i }));

      // Search again to render the same result
      await user.click(searchBtn);

      // Now the button should contain the checkmark icon
      const updatedPhotoBtn = (await screen.findByAltText('cool cyber scene')).closest('button');
      expect(within(updatedPhotoBtn!).getByText('check')).toBeInTheDocument();

      // Close the background image modal
      await user.click(screen.getByRole('button', { name: '[ Close ]' }));

      // Unsplash modal should be closed, and url should be updated in the main form input
      const posterInput = screen.getByPlaceholderText(/Default: Empty -> Standard Black Cells Grid/i);
      expect(posterInput).toHaveValue('https://images.unsplash.com/photo-1-regular.jpg');

      // Submit form and check it contains the background image url
      const submitBtn = screen.getByRole('button', { name: /LAUNCH STREAM ROOM/i });
      await user.click(submitBtn);

      expect(mockCreateStandaloneRoom).toHaveBeenCalledWith(
        expect.objectContaining({
          poster: 'https://images.unsplash.com/photo-1-regular.jpg',
          roomConfig: expect.objectContaining({
            bgImageUrl: 'https://images.unsplash.com/photo-1-regular.jpg',
          }),
        })
      );
    });

    it('allows searching Unsplash by clicking a top tag', async () => {
      const user = userEvent.setup();

      // Mock Unsplash API Response
      const mockPhotos = {
        results: [
          {
            id: 'photo-2',
            urls: {
              regular: 'https://images.unsplash.com/photo-2-regular.jpg',
              thumb: 'https://images.unsplash.com/photo-2-thumb.jpg',
            },
            alt_description: 'chill ambient scene',
            user: { name: 'Bob Chill' },
          },
        ],
      };

      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPhotos),
        })
      );
      globalThis.fetch = mockFetch;

      render(<CreateRoomModal />);

      // Open Background Image Modal
      const openModalBtn = screen.getByText(/CHOOSE THEME/i);
      await user.click(openModalBtn);

      // Switch to Unsplash Search tab
      const unsplashTabBtn = screen.getByRole('button', { name: /Unsplash Search/i });
      await user.click(unsplashTabBtn);

      // Verify that top tags are rendered
      // We expect tags like "#deepwork", "#nightdrive", "#chill" to be present from the default store state
      const topTagBtn = screen.getByRole('button', { name: /#chill/i });
      expect(topTagBtn).toBeInTheDocument();

      // Click the top tag
      await user.click(topTagBtn);

      // Check fetch call options (search query should be cleaned to 'chill')
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/media/unsplash/search?query=chill'),
        expect.any(Object)
      );

      // Verify search results are displayed
      const searchResultImg = await screen.findByAltText('chill ambient scene');
      expect(searchResultImg).toBeInTheDocument();
    });
  });
});
