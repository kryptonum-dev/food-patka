import { DOMAIN } from '@/global/constants';
import {
  Body, Container, Font, Head, Heading, Hr, Html, Img, Link, Preview, Text
} from '@react-email/components';

type SendPromoCodeTypes = {
  name: string;
  code: string;
};

export default function SendPromoCode({ name, code }: SendPromoCodeTypes) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Rosario"
          fallbackFontFamily={['Georgia', 'serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/rosario/v31/xfuu0WDhWW_fOEoY8l_VPNZfB7jPM68YCVc0fecFPiUCl08.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Twój kod zniżkowy na kolejne zakupy w sklepie FoodPatka!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Link
            href={DOMAIN}
            target='_blank'
            rel='noreferrer'
            style={{
              display: 'inline-block',
              marginTop: '48px',
            }}
          >
            <Img
              src={`${DOMAIN}/food-patka-logo.png`}
              width="189"
              height="33.96"
              alt="FoodPatka"
            />
          </Link>
          <Heading style={h1}>{name}, otrzymujesz kod rabatowy na zakupy w sklepie FoodPatka!</Heading>
          <Text style={{ ...text }}>Mam dla Ciebie specjalny kod rabatowy w wysokości 10% na kolejne zakupy. Możesz wykorzystać go w ciągu 3. miesięcy od otrzymania tego maila – wystarczy, że wpiszesz poniższy kod podczas finalizacji zamówienia.</Text>
          <Text style={{ ...text, marginBottom: '14px' }}>Oto Twój unikalny kod rabatowy:</Text>
          <code style={{
            fontSize: '18px',
            fontFamily: 'monospace',
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: '#FFFDFD',
            borderRadius: '23px',
            border: '1px solid #FFB8CE',
            color: '#726378',
          }}>
            {code}
          </code>
          <Hr style={{
            margin: '48px 0',
          }} />
          <Text
            style={{
              ...text,
              fontSize: '14px',
            }}
          >
            Ta wiadomość dotarła do Ciebie, ponieważ zakupiłeś produkt w sklepie FoodPatka.
          </Text>
        </Container>
      </Body>
    </Html >
  );
}

const main = {
  backgroundColor: '#FFFDFD',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#726378',
  fontSize: '32px',
  margin: '48px 0',
  padding: '0',
};

const text = {
  color: '#726378',
  fontSize: '16px',
  margin: '24px 0',
};