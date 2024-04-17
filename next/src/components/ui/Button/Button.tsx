import Link from 'next/link';
import styles from './Button.module.scss';
import { isExternalLink } from '@/utils/is-external-link';
import type { ButtonTypes } from './Button.types';

export default function Button({ data, href, children, className, ...props }: ButtonTypes) {
  if (data) {
    href = data.href;
    children = data.text;
  }

  const isExternal = isExternalLink(href);
  const Element = href ? (isExternal ? 'a' : Link) : 'button';

  return (
    <Element
      href={href || ''}
      {...(href && {
        href: href,
        ...isExternal && { target: '_blank', rel: 'noopener' }
      })}
      className={`${styles['Button']}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span>{children}</span>
      <Star1Icon className={styles.Star1Icon} />
      <Star2Icon className={styles.Star2Icon} />
      <Star3Icon className={styles.Star3Icon} />
    </Element>
  );
};

const Star1Icon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={8}
    fill="none"
    {...props}
  >
    <path
      d="M4.346.835c.013-.113.178-.113.192 0l.113.953a2.682 2.682 0 0 0 2.347 2.348l.953.113c.114.014.114.178 0 .192l-.953.113a2.682 2.682 0 0 0-2.347 2.347l-.113.954c-.014.113-.179.113-.192 0L4.233 6.9a2.682 2.682 0 0 0-2.348-2.347l-.953-.113c-.114-.014-.114-.178 0-.192l.953-.113a2.682 2.682 0 0 0 2.348-2.348l.113-.953Z"
      fill="#F489A9"
    />
  </svg>
)
const Star2Icon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      d="M6.665.467c.026-.216.34-.216.365 0l.216 1.816a5.109 5.109 0 0 0 4.471 4.471l1.816.216c.216.025.216.34 0 .365l-1.816.215a5.109 5.109 0 0 0-4.471 4.472l-.216 1.816c-.025.216-.34.216-.365 0l-.216-1.816A5.109 5.109 0 0 0 1.98 7.55L.161 7.335c-.216-.026-.216-.34 0-.365l1.816-.216A5.109 5.109 0 0 0 6.45 2.283L6.665.467Z"
      fill="#FFFDFD"
    />
  </svg>
)
const Star3Icon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={23}
    fill="none"
    {...props}
  >
    <path
      d="M10.752 1.003c.04-.337.53-.337.57 0l.336 2.833a7.97 7.97 0 0 0 6.975 6.975l2.832.336c.338.04.338.53 0 .57l-2.832.336a7.97 7.97 0 0 0-6.975 6.976l-.336 2.832c-.04.338-.53.338-.57 0l-.337-2.832a7.97 7.97 0 0 0-6.975-6.976l-2.832-.336c-.338-.04-.338-.53 0-.57l2.832-.336a7.97 7.97 0 0 0 6.976-6.975l.336-2.833Z"
      fill="#E6688D"
    />
  </svg>
)