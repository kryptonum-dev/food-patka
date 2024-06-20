import sanityFetch from '@/utils/sanity.fetch';
import { DEFAULT_DESCRIPTION, DOMAIN, LOGO_URL } from '@/global/constants';

type QueryTypes = {
  OrganizationSchema: {
    name?: string;
    description?: string;
  };
  email?: string;
  phone?: string;
  socials: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  }
};

const SchemaOrganization = async () => {
  const {
    OrganizationSchema: { name: OrganizationSchema_Name, description: OrganizationSchema_Description },
    email,
    phone,
    socials: {
      facebook,
      instagram,
      youtube,
      tiktok,
    }
  } = await query();

  const socialMediaUrls = [facebook, instagram, youtube, tiktok].filter(Boolean);

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: DOMAIN,
          ...(email && { email: email }),
          ...(phone && { telephone: phone }),
          ...(OrganizationSchema_Name && { name: OrganizationSchema_Name }),
          description: OrganizationSchema_Description || DEFAULT_DESCRIPTION,
          logo: LOGO_URL,
          image: LOGO_URL,
          OpeningHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '00:00',
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: email,
            },
          ],
          sameAs: [socialMediaUrls],
        }),
      }}
    />
  );
};

export default SchemaOrganization;

const query = async (): Promise<QueryTypes> => {
  return await sanityFetch<QueryTypes>({
    query: /* groq */ `
      *[_id == "global"][0] {
        OrganizationSchema {
          name,
          description,
        },
        email,
        phone,
        socials {
          facebook,
          instagram,
          youtube,
          tiktok,
        }
      }
    `,
    tags: ['global'],
  });
};
