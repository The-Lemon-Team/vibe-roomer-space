import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ImageManager } from '../ImageManager';
import { useAtmosphericStore } from '../../../store/useAtmosphericStore';
import { fetchApi } from '../../../services/api';

// Mock the Zustand stores
vi.mock('../../../store/useAtmosphericStore', () => ({
  useAtmosphericStore: vi.fn(),
}));

// Mock the api service fetchApi helper
vi.mock('../../../services/api', () => ({
  fetchApi: vi.fn(),
}));

describe('ImageManager & AddImageModal Component', () => {
  const mockOnChange = vi.fn();
  let atmosphericStoreState: any;

  beforeEach(() => {
    vi.clearAllMocks();

    atmosphericStoreState = {
      vibes: [
        {
          id: 'vibe-1',
          title: 'Cyber Coffee Vibe',
          images: ['https://example.com/vibe-1.jpg'],
        },
      ],
      rooms: [
        {
          id: 'room-1',
          title: 'Neon Chill Zone',
          poster: 'https://example.com/room-1.jpg',
        },
      ],
      topHashtags: ['#ambient', '#cyberpunk'],
    };

    (useAtmosphericStore as any).mockImplementation(() => atmosphericStoreState);
  });

  it('renders correctly and opens the modal when + Add Image is clicked', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    // Click "+ Add Image" button
    const addButton = screen.getByRole('button', { name: /\+ Add Image/i });
    await user.click(addButton);

    // Verify modal title is displayed
    expect(screen.getByText('[ ADD IMAGE SOURCE ]')).toBeInTheDocument();
  });

  it('allows adding an image by pasting a direct URL in the modal', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    // Open modal
    await user.click(screen.getByRole('button', { name: /\+ Add Image/i }));

    // Input URL
    const urlInput = screen.getByPlaceholderText('https://images.unsplash.com/photo-...');

    await user.type(urlInput, 'https://example.com/new-image.jpg');

    // Click Add URL
    const submitBtn = screen.getByRole('button', { name: /Add URL/i });
    await user.click(submitBtn);

    // Verify onChange callback was triggered
    expect(mockOnChange).toHaveBeenCalledWith(['https://example.com/new-image.jpg']);
  });

  it('allows searching Unsplash and selecting an image', async () => {
    const user = userEvent.setup();

    // Mock Unsplash API Response
    (fetchApi as any).mockResolvedValue({
      results: [
        {
          id: 'photo-123',
          urls: {
            regular: 'https://images.unsplash.com/photo-123-regular.jpg',
            thumb: 'https://images.unsplash.com/photo-123-thumb.jpg',
          },
          alt_description: 'cool neon light',
          user: { name: 'Vibe Photographer' },
        },
      ],
    });

    render(<ImageManager images={[]} onChange={mockOnChange} />);

    // Open modal
    await user.click(screen.getByRole('button', { name: /\+ Add Image/i }));

    // Go to Unsplash tab
    await user.click(screen.getByRole('button', { name: /Unsplash/i }));

    // Search query
    const searchInput = screen.getByPlaceholderText(/Search aesthetic wallpaper.../i);
    await user.type(searchInput, 'neon');

    const searchBtn = screen.getByRole('button', { name: /Search/i });
    await user.click(searchBtn);

    // Verify API call was made
    expect(fetchApi).toHaveBeenCalledWith(expect.stringContaining('/media/unsplash/search?query=neon'));

    // Select the retrieved image
    const resultImg = await screen.findByAltText('cool neon light');
    await user.click(resultImg);

    // Verify image was added
    expect(mockOnChange).toHaveBeenCalledWith(['https://images.unsplash.com/photo-123-regular.jpg']);
  });

  it.skip('allows browsing and selecting images from site data (vibes, rooms, and uploads)', async () => {
    const user = userEvent.setup();

    // Mock API response for uploaded files
    (fetchApi as any).mockResolvedValue([
      {
        filename: 'my-uploaded-file.jpg',
        url: '/media/my-uploaded-file.jpg',
        size: 12345,
        updatedAt: '2026-07-30T12:00:00Z',
      },
    ]);

    render(<ImageManager images={[]} onChange={mockOnChange} />);

    // Open modal
    await user.click(screen.getByRole('button', { name: /\+ Add Image/i }));

    // Go to Site Data tab
    await user.click(screen.getByRole('button', { name: /Site Data/i }));

    // Verify vibes and rooms images are rendered in the site library grid
    const siteImages = await screen.findAllByRole('button');
    // Site Data tab contains search input, plus selectable grid image items
    expect(fetchApi).toHaveBeenCalledWith('/media');

    // Filter site data
    const filterInput = screen.getByPlaceholderText(/Search images from vibes, rooms, uploads.../i);
    await user.type(filterInput, 'Neon');

    // Click the Neon Room poster image (it matches 'Neon Chill Zone')
    const neonRoomImage = screen.getByAltText('Neon Chill Zone');
    await user.click(neonRoomImage);

    // Verify image is selected
    expect(mockOnChange).toHaveBeenCalledWith(['https://example.com/room-1.jpg']);
  });
});
