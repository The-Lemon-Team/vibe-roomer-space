import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const {
  mockUploadMedia,
  mockSearchUnsplash,
  emptyMedia,
  mockVibes,
  mockRooms,
  mockHashtags,
} = vi.hoisted(() => ({
  mockUploadMedia: vi.fn(),
  mockSearchUnsplash: vi.fn(),
  emptyMedia: [] as unknown[],
  mockVibes: [
    {
      id: 'vibe-1',
      title: 'Cyber Coffee Vibe',
      images: ['https://example.com/vibe-1.jpg'],
    },
  ],
  mockRooms: [
    {
      id: 'room-1',
      title: 'Neon Chill Zone',
      poster: 'https://example.com/room-1.jpg',
    },
  ],
  mockHashtags: [
    { name: 'ambient', useCount: 3 },
    { name: 'cyberpunk', useCount: 2 },
  ],
}));

vi.mock('../../../store/api/mediaApi', () => ({
  useUploadMediaMutation: () => [mockUploadMedia, { isLoading: false }],
  useListMediaQuery: () => ({ data: emptyMedia, isFetching: false }),
  useLazySearchUnsplashQuery: () => [mockSearchUnsplash, { isFetching: false }],
}));

vi.mock('../../../store/api/vibesApi', () => ({
  useGetVibesQuery: () => ({ data: mockVibes }),
  useGetTopHashtagsQuery: () => ({ data: mockHashtags }),
}));

vi.mock('../../../store/api/roomsApi', () => ({
  useGetRoomsQuery: () => ({ data: mockRooms }),
}));

import { ImageManager } from '../ImageManager';

describe('ImageManager & AddImageModal', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUploadMedia.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          url: 'https://cdn.example.com/uploaded.jpg',
          filename: 'uploaded.jpg',
          message: 'ok',
        }),
    });
    mockSearchUnsplash.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
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
        }),
    });
  });

  it('renders picture-card gallery and opens the modal from + Upload', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    expect(screen.getByText(/MEDIA_IMAGE_CONTROLLER/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Add image/i }));
    expect(screen.getByText('[ ADD IMAGE SOURCE ]')).toBeInTheDocument();
    expect(screen.getByText(/Choose image file/i)).toBeInTheDocument();
  });

  it('shows main badge and allows set-as-main / remove', async () => {
    const user = userEvent.setup();
    render(
      <ImageManager
        images={['https://example.com/a.jpg', 'https://example.com/b.jpg']}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('★ MAIN')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Set as main/i }));
    expect(mockOnChange).toHaveBeenCalledWith([
      'https://example.com/b.jpg',
      'https://example.com/a.jpg',
    ]);

    mockOnChange.mockClear();
    await user.click(screen.getAllByRole('button', { name: /Remove image/i })[0]);
    expect(mockOnChange).toHaveBeenCalledWith(['https://example.com/b.jpg']);
  });

  it('allows adding an image by pasting a direct URL in the modal', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    await user.click(screen.getByRole('button', { name: /Add image/i }));
    await user.click(screen.getByRole('button', { name: /URL tab/i }));

    const urlInput = screen.getByPlaceholderText('https://…');
    await user.type(urlInput, 'https://example.com/new-image.jpg');
    await user.click(screen.getByRole('button', { name: /Add URL/i }));

    expect(mockOnChange).toHaveBeenCalledWith(['https://example.com/new-image.jpg']);
  });

  it('allows searching Unsplash and selecting an image', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    await user.click(screen.getByRole('button', { name: /Add image/i }));
    await user.click(screen.getByRole('button', { name: /Unsplash tab/i }));

    const searchInput = screen.getByPlaceholderText(/Search Unsplash/i);
    await user.type(searchInput, 'neon');
    await user.click(screen.getByRole('button', { name: /Search/i }));

    expect(mockSearchUnsplash).toHaveBeenCalledWith('neon');

    const resultImg = await screen.findByAltText('cool neon light');
    await user.click(resultImg);

    expect(mockOnChange).toHaveBeenCalledWith([
      'https://images.unsplash.com/photo-123-regular.jpg',
    ]);
  });

  it('allows browsing and selecting images from the library tab', async () => {
    const user = userEvent.setup();
    render(<ImageManager images={[]} onChange={mockOnChange} />);

    await user.click(screen.getByRole('button', { name: /Add image/i }));
    await user.click(screen.getByRole('button', { name: /Library tab/i }));

    const filterInput = screen.getByPlaceholderText(/Search library/i);
    await user.type(filterInput, 'Neon');

    const neonRoomImage = await screen.findByAltText('Neon Chill Zone');
    await user.click(neonRoomImage);

    expect(mockOnChange).toHaveBeenCalledWith(['https://example.com/room-1.jpg']);
  });
});
