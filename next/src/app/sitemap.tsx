import sanityFetch from '@/utils/sanity.fetch';
import { ITEMS_PER_PAGE } from '@/components/ui/Pagination/Pagination';
import { DOMAIN } from '@/global/constants';
import type { MetadataRoute } from 'next';

type QueryTypes = {
  blogCategories: {
    slug: string;
  }[];
  blogPosts: {
    slug: string;
  }[];
  products: {
    slug: string;
  }[];
  productsMainCategories: {
    slug: string;
    productsCount: number;
  }[];
  productsSubCategories: {
    slug: string;
    productsCount: number;
    mainCategorySlug: string;
  }[];
};

const staticRoutes = [
  '/',
  '/o-marce',
  '/wspolpraca',
  '/kontakt',
  '/sklep',
  '/blog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    blogCategories = [],
    blogPosts = [],
    products = [],
    productsMainCategories = [],
    productsSubCategories = [],
  } = await query();

  const productsPagination = Array.from({ length: Math.ceil(products.length / ITEMS_PER_PAGE) - 1 }, (_, i) => ({
    slug: `sklep/strona/${i + 2}`,
  }));

  const productsMainCategoryPagination = productsMainCategories.flatMap(({ slug, productsCount = 1 }) => {
    const totalPages = Math.ceil(productsCount / ITEMS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      slug: `sklep/kategoria/${slug}/strona/${i + 2}`,
    }));
  });

  const productsSubCategoryPagination = productsSubCategories.flatMap(({ slug, productsCount = 1, mainCategorySlug }) => {
    const totalPages = Math.ceil(productsCount / ITEMS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      slug: `sklep/kategoria/${mainCategorySlug}/${slug}/strona/${i + 2}`,
    }));
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${DOMAIN}${route}`,
      lastModified: new Date(),
    })),
    ...blogCategories.map(({ slug }) => ({
      url: `${DOMAIN}/blog/kategoria/${slug}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map(({ slug }) => ({
      url: `${DOMAIN}/blog/${slug}`,
      lastModified: new Date(),
    })),
    ...products.map(({ slug }) => ({
      url: `${DOMAIN}/sklep/${slug}`,
      lastModified: new Date(),
    })),
    ...productsPagination.map(({ slug }) => ({
      url: `${DOMAIN}/${slug}`,
      lastModified: new Date(),
    })),
    ...productsMainCategories.map(({ slug }) => ({
      url: `${DOMAIN}/sklep/kategoria/${slug}`,
      lastModified: new Date(),
    })),
    ...productsMainCategoryPagination.map(({ slug }) => ({
      url: `${DOMAIN}/${slug}`,
      lastModified: new Date(),
    })),
    ...productsSubCategories.map(({ slug, mainCategorySlug }) => ({
      url: `${DOMAIN}/sklep/kategoria/${mainCategorySlug}/${slug}`,
      lastModified: new Date(),
    })),
    ...productsSubCategoryPagination.map(({ slug }) => ({
      url: `${DOMAIN}/${slug}`,
      lastModified: new Date(),
    })),
  ];
}

const query = async (): Promise<QueryTypes> => {
  return await sanityFetch<QueryTypes>({
    query: /* groq */ `
      {
        "blogCategories": *[_type == "BlogCategory_Collection"
          && count(*[_type == "BlogPost_Collection" && references(^._id)]) > 0
        ] {
          "slug": slug.current,
        },
        "blogPosts": *[_type == "BlogPost_Collection"] {
          "slug": slug.current,
        },
        "products": *[_type == "Product_Collection"] {
          "slug": slug.current,
        },
        "productsMainCategories": *[_type == "ProductCategory_Collection"
          && isSubcategory == false
          && count(*[_type == "Product_Collection" && references(^._id)]) > 0
        ] {
          "slug": slug.current,
          "productsCount": count(*[_type == "Product_Collection" && references(^._id)]),
        },
        "productsSubCategories": *[_type == "ProductCategory_Collection"
          && isSubcategory == true
          && count(*[_type == "Product_Collection" && references(^._id)]) > 0
        ] {
          "slug": slug.current,
          "productsCount": count(*[_type == "Product_Collection" && references(^._id)]),
          "mainCategorySlug": mainCategory -> slug.current,
        },
      }
    `,
    tags: ['BlogCategory_Collection', 'BlogPost_Collection', 'Product_Collection', 'ProductCategory_Collection'],
  });
};
