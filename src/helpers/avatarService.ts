const AVATAR_KEY = 'selected_avatar';

export const getSelectedAvatarId = (): number => {
  const savedId = localStorage.getItem(AVATAR_KEY);
  return savedId ? parseInt(savedId) : 1; 
};

export const saveSelectedAvatarId = (avatarId: number): void => {
  localStorage.setItem(AVATAR_KEY, avatarId.toString());
  window.dispatchEvent(new Event('avatarChanged'));
};