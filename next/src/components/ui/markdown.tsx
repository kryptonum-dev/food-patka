import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { isExternalLink } from '@/utils/is-external-link';

export const LinkRenderer = ({
  href,
  children,
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
}) => {
  const isExternal = isExternalLink(href);
  const Element = isExternal ? 'a' : Link;

  return (
    <Element
      href={href || ''}
      className='link'
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener',
      })}
    >
      {children}
    </Element>
  );
};

export const ListRenderer = ({
  ordered,
  children,
}: React.LiHTMLAttributes<HTMLLIElement> & {
  children?: React.ReactNode;
  ordered?: boolean;
}) => (
  <li>
    {!ordered && <BulletList />}
    <span>{children}</span>
  </li>
);

type MarkdownTypes = {
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  components?: Record<string, React.ReactNode>;
  children: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Markdown({ Tag, components, children, ...props }: MarkdownTypes) {
  const markdown = (
    <MDXRemote
      source={children}
      components={{
        ...(Tag && {
          p: ({ children }) => (
            <Tag {...props}>
              {children}
            </Tag>
          ),
        }),
        a: LinkRenderer,
        li: ListRenderer,
        ol: ({ children }) => <ol className='orderedList'>{children}</ol>,
        ul: ({ children }) => <ul className='unorderedList'>{children}</ul>,
        ...components,
      }}
      {...props}
    />
  );

  return Tag ? (
    markdown
  ) : (
    <div {...props}>
      {markdown}
    </div>
  );
}

Markdown.h1 = (props: MarkdownTypes) => <Markdown Tag="h1" {...props} />;
Markdown.h2 = (props: MarkdownTypes) => <Markdown Tag="h2" {...props} />;
Markdown.h3 = (props: MarkdownTypes) => <Markdown Tag="h3" {...props} />;
Markdown.h4 = (props: MarkdownTypes) => <Markdown Tag="h4" {...props} />;
Markdown.h5 = (props: MarkdownTypes) => <Markdown Tag="h5" {...props} />;
Markdown.h6 = (props: MarkdownTypes) => <Markdown Tag="h6" {...props} />;
Markdown.span = (props: MarkdownTypes) => <Markdown Tag="span" {...props} />;
Markdown.p = (props: MarkdownTypes) => <Markdown Tag="p" {...props} />;

const BulletList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="#FFB8CE"
  >
    <path
      d="M8.516.207c.033-.276.435-.276.468 0l.275 2.32a6.528 6.528 0 0 0 5.713 5.714l2.32.275c.277.033.277.435 0 .468l-2.32.275a6.528 6.528 0 0 0-5.713 5.713l-.275 2.32c-.033.277-.435.277-.468 0l-.275-2.32A6.528 6.528 0 0 0 2.528 9.26l-2.32-.275c-.277-.033-.277-.435 0-.468l2.32-.275A6.528 6.528 0 0 0 8.24 2.528l.275-2.32Z"
    />
  </svg>
);
