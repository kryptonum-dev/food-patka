import styles from './Header.module.scss';
import type { SocialMediaTypes } from './Header.types';

export default async function SocialMedia({ data }: SocialMediaTypes) {
  return (
    <ul className={styles['Socials']}>
      {Object.entries(data).map(([platform, url]) => (
        <li key={platform}>
          <a href={url} target="_blank" rel="noreferrer">
            {platform === 'instagram' && <InstagramIcon />}
            {platform === 'youtube' && <YoutubeIcon />}
            {platform === 'tiktok' && <TiktokIcon />}
          </a>
        </li>
      ))}
    </ul>
  );
}

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    aria-label='Instagram'
  >
    <path
      d="M14.583 5.417h.008m-8.758-3.75h8.333a4.167 4.167 0 0 1 4.167 4.166v8.334a4.167 4.167 0 0 1-4.166 4.166H5.832a4.167 4.167 0 0 1-4.167-4.166V5.833a4.167 4.167 0 0 1 4.167-4.166Zm7.5 7.808a3.333 3.333 0 1 1-6.594.978 3.333 3.333 0 0 1 6.594-.978Z"
      stroke="#F489A9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke="#F489A9"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label='YouTube'
  >
    <path d="M1.094 14.688a22.613 22.613 0 0 1 0-9.376A1.875 1.875 0 0 1 2.406 4a46.464 46.464 0 0 1 15.188 0 1.875 1.875 0 0 1 1.313 1.312c.655 3.091.655 6.285 0 9.376A1.875 1.875 0 0 1 17.594 16a46.454 46.454 0 0 1-15.188 0 1.875 1.875 0 0 1-1.312-1.312Z" />
    <path d="M8.125 12.813 12.813 10 8.125 7.187v5.625Z" />
  </svg>
);

const TiktokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    aria-label='TikTok'
  >
    <path
      d="M13.38 2.166c-.034-.274-.255-.5-.531-.5H11.04a.5.5 0 0 0-.5.5V13.02c0 1.353-1.08 2.464-2.425 2.464-1.344 0-2.424-1.111-2.424-2.464 0-1.161.807-2.138 1.876-2.398.261-.063.476-.278.476-.547v-1.86c0-.28-.23-.507-.507-.476-2.618.299-4.654 2.534-4.654 5.281 0 2.947 2.353 5.314 5.257 5.314 2.905 0 5.258-2.391 5.258-5.314V8.183c0-.409.473-.654.836-.465.729.38 1.535.625 2.377.707a.47.47 0 0 0 .508-.48V6.087c0-.27-.215-.487-.481-.53a3.912 3.912 0 0 1-3.257-3.391Z"
      stroke="#F489A9"
      strokeWidth={1.5}
    />
  </svg>
);
