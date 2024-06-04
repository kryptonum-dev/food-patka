import NextImage from 'next/image';

const defaultPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUltCqBwABcQDWMIsO5gAAAABJRU5ErkJggg==';

export type ImgDataTypes = {
  asset: {
    url: string;
    altText: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip: string;
    };
  };
};

type ImageTypes = (
  | {
    data: ImgDataTypes;
    src?: never;
    width?: number;
    height?: number;
    alt?: string;
  }
  | {
    data?: never;
    src: string;
    width: number;
    height: number;
    alt: string;
  }
) & {
  sizes: string;
  priority?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

export const ImgDataQuery = `
  asset -> {
    url,
    altText,
    metadata {
      dimensions {
        width,
        height,
      },
      lqip,
    },
  },
`;

export default function Img({ data, src, width, height, alt, sizes, priority, ...props }: ImageTypes) {
  const placeholder = data?.asset?.metadata?.lqip || defaultPlaceholder;
  if (data) {
    src = data.asset?.url;
    width = width || data.asset?.metadata?.dimensions?.width;
    height = height || data.asset?.metadata?.dimensions?.height;
    alt = alt || data.asset?.altText;
  }

  return (
    <NextImage
      src={src!}
      width={width}
      height={height}
      alt={alt || ''}
      sizes={sizes}
      priority={priority}
      {...((width! > 40 || height! > 40) && {
        blurDataURL: placeholder,
        placeholder: 'blur',
      })}
      {...props}
    />
  );
}