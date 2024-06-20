type ProductSchemaTypes = {
  name: string;
  image_url?: string;
  rating_value: number;
  rating_count: number;
};

export default function ProductSchema({ name, image_url, rating_value, rating_count }: ProductSchemaTypes) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          'name': name,
          ...image_url && {
            'image': image_url,
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': rating_value,
            'ratingCount': rating_count,
            'bestRating': 5,
          }
        }),
      }}
    />
  );
}
