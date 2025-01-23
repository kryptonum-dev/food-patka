import type { ImgDataTypes } from '@/components/ui/image';
import type { VideoDataProps } from '@/components/ui/Video';

export type HighlightedSectionTypes = {
  heading: string;
  paragraph: string;
  isReversed: boolean;
  img?: ImgDataTypes;
  video?: VideoDataProps;
};
