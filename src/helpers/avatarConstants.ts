import first from '../assets/first.png'
import second from '../assets/second.png'
import third from '../assets/third.png'
import fourth from '../assets/fourth.png'
import fifth from '../assets/fifth.png'

export type AvatarType = {
  id: number;
  levelRequired: number;
  src: any;
  alt: string;
};

export const availableAvatars: AvatarType[] = [
  { id: 1, levelRequired: 1, src: first, alt: 'Новичок' },
  { id: 2, levelRequired: 1, src: second, alt: 'Ученик' },
  { id: 3, levelRequired: 2, src: third, alt: 'Опытный' },
  { id: 4, levelRequired: 2, src: fourth, alt: 'Продвинутый' },
  { id: 5, levelRequired: 3, src: fifth, alt: 'Мастер' },
];