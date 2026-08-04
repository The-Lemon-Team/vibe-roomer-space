export const MenuTagScope = {
  VIBES: 'VIBES',
  ROOMS: 'ROOMS',
} as const;

export type MenuTagScope = (typeof MenuTagScope)[keyof typeof MenuTagScope];
