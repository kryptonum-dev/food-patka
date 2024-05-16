import { BACKGROUND_COLOR, DEFAULT_DESCRIPTION, DEFAULT_TITLE, ICON_URL, THEME_COLOR } from '@/global/constants';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DEFAULT_TITLE,
    short_name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: ICON_URL,
        type: 'image/png',
      },
    ],
  };
}
