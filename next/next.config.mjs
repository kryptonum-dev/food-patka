/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/najlepsze-przepisy-na-zdrowe-sniadanie-top-5/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/zdrowe-lunchboxy-do-pracy-najlepsze-przepisy/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/pomysly-na-na-posilki-i-dania-do-300-kcal/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/smaczne-zdrowe-sniadanie-do-pracy/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/jak-jesc-zdrowo-w-upalne-dni-posilki-na-gorace-dni-ktore-pozwola-ci-przetrwac-upaly-dieta-na-upaly/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/jak-gotowac-zdrowo-tanio-i-smacznie-oraz-jak-madrze-robic-zakupy-spozywcze-fit-posilki-na-kazda-kieszen/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/przepisy-na-zdrowe-desery-pomysly-na-dietetyczne-desery-fit/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/przepis-na-dania-jednogarnkowe-fit-jak-przygotowac-zdrowe-obiady-jednogarnkowe/',
        destination: '/blog',
        permanent: true,
      },

      {
        source: '/shop-2/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/produkt/jadlospis-wyzwanie-odchudzanie-30-dni-wegetarianski-2/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/produkt/jadlospis-wyzwanie-odchudzanie-30-dni-z-kurczakiem-2/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/produkt/az-53-przepisy-fit-deserki-zdrowe-sniadania-makaronowy-raj/',
        destination: '/sklep/makaronowy-raj-ebook-z-przepisami',
        permanent: true,
      },
      {
        source: '/produkt/makaronowy-raj-ebook-z-przepisami-kopia/',
        destination: '/sklep/makaronowy-raj-ebook-z-przepisami',
        permanent: true,
      },
      {
        source: '/produkt/mrozne-marzenia-2/',
        destination: '/sklep/e-book-dietetyczny-mrozne-marzenia',
        permanent: true,
      },
      {
        source: '/produkt/zdrowe-sniadania/',
        destination: '/sklep/e-book-dietetyczny-zdrowe-sniadania',
        permanent: true,
      },
      {
        source: '/produkt/fit-deserki-e-book-z-przepisami-2/',
        destination: '/sklep/fit-deserki-e-book-z-przepisami',
        permanent: true,
      },
      {
        source: '/produkt/program-treningowy-trening-w-domu-2/',
        destination: '/sklep/plan-treningowy-trening-w-domu',
        permanent: true,
      },
      {
        source: '/produkt/101-pytan-do-odchudzania/',
        destination: '/sklep/e-book-dietetyczny-101-pytan-do-odchudzania',
        permanent: true,
      },
      {
        source: '/produkt/program-treningowy-silownia/',
        destination: '/sklep/plan-treningowy-silownia',
        permanent: true,
      },
      {
        source: '/produkt/1485/',
        destination: '/sklep/lunchboxy-przepisy-na-smakowite-dania-na-wynos',
        permanent: true,
      },
      {
        source: '/produkt/fit-smacznie/',
        destination: '/sklep/fit-smacznie-300-kalorii-i-mniej',
        permanent: true,
      },
      {
        source: '/produkt/wakacje/',
        destination: '/sklep/jadlospis-i-znacznie-wiecej',
        permanent: true,
      },

      {
        source: '/koszyk/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/my-account-2/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shop-2/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/o-marce',
        permanent: true,
      },
      {
        source: '/checkout-2/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/polityka-prywatnosci/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/regulamin/',
        destination: '/',
        permanent: true,
      },

      {
        source: '/elementor-hf/stopka/',
        destination: '/',
        permanent: true,
      },

      {
        source: '/category/blog/',
        destination: '/blog',
        permanent: true,
      },

      {
        source: '/tag/300kcal/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/dieta/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/pomysly/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/posilek-300kcal/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/posilek-do-pracy/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/posilki-300kcal/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/przepisy/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/sniadanie-do-pracy/',
        destination: '/blog',
        permanent: true,
      },

      {
        source: '/kategoria-produktu/ebooki-merytoryczne/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/kategoria-produktu/ebooki-kulinarne/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/kategoria-produktu/jadlospisy/',
        destination: '/sklep',
        permanent: true,
      },
      {
        source: '/kategoria-produktu/plany-treningowe/',
        destination: '/sklep',
        permanent: true,
      },

      {
        source: '/author/admin-gtnvcywp/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;