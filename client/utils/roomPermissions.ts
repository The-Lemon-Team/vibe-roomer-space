import { CreatedRoom } from '../store/useAtmosphericStore';
import { UserProfile } from '../store/useAuthStore';

export interface RoomPostingPermission {
  canPost: boolean;
  isCreator: boolean;
  reason?: string;
}

/**
 * Evaluates whether a user can post content/transmissions to a room stream.
 * Currently restricted to the Room Creator.
 * Designed to be easily extensible for future permission modes (e.g., room moderators, public posting toggles, role-based controls).
 */
export const checkRoomPostingPermission = (
  room: CreatedRoom | null,
  user: UserProfile | null,
  isAuthenticated: boolean,
): RoomPostingPermission => {
  if (!room) {
    return {
      canPost: false,
      isCreator: false,
      reason: 'No active room target.',
    };
  }

  // Strict creator check: matches authenticated user ID or username with room author
  const isCreator =
    isAuthenticated &&
    !!user &&
    (user.id === room.authorId || user.username === room.authorName);

  if (!isCreator) {
    return {
      canPost: false,
      isCreator: false,
      reason: `Posting content to this room stream is currently restricted to the room creator (@${room.authorName || 'operator'}).`,
    };
  }

  return {
    canPost: true,
    isCreator: true,
  };
};
