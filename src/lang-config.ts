export interface ILang {
  id: string;
  label: string;
  default?: boolean;
  rtl?: boolean;
}

export const langConfigTemplate: ILang[] = [
  {
    id: 'en',
    label: 'English',
    default: true
  },
  {
    id: 'ru-RU',
    label: 'Русский'
  },
  {
    id: 'ar-SA',
    label: 'العربية',
    rtl: true
  }
];
