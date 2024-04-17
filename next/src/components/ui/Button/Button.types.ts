export type ButtonTypes = (
  {
    data: ButtonDataTypes;
    href?: never;
    children?: never;
  }
  | {
    data?: never;
    href?: ButtonDataTypes['href'];
    children: ButtonDataTypes['text'];
  }
) & React.AnchorHTMLAttributes<HTMLAnchorElement>
  & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonDataTypes = {
  href: string;
  text: string | React.ReactNode;
};
