import sanityFetch from '@/utils/sanity.fetch';
import { DEFAULT_TITLE, DOMAIN, LOCALE } from '@/global/constants';
import type { Metadata } from 'next';
import type { GlobalQueryTypes, SeoTypes } from './Seo.types';

export default async function Seo({ title, description, path, openGraphImage, ...props }: SeoTypes): Promise<Metadata> {
  const { globalOpenGraphImage } = await query();

  const url = `${DOMAIN}${path}`;

  console.log(openGraphImage);

  const seo = {
    title: title || DEFAULT_TITLE,
    description: description || '',
    url,
    image: openGraphImage || globalOpenGraphImage,
  };

  const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: seo.title,
      url: seo.url,
      images: [
        {
          url: seo.image.url,
          width: 1200,
          height: seo.image.height,
        },
      ],
      locale: LOCALE,
      type: 'website',
    },
    ...props,
  };
  return metadata;
}

const query = async (): Promise<GlobalQueryTypes> => {
  return await sanityFetch<GlobalQueryTypes>({
    query: /* groq */ `
      *[_id == "global"][0] {
        "globalOpenGraphImage": {
          "url": seo.og_Img.asset -> url + "?w=1200",
          "height": round(1200 / seo.og_Img.asset -> metadata.dimensions.aspectRatio),
        }
      }
    `,
    tags: ['global'],
  });
};
