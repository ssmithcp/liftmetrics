export const Style = 'text-primary cursor-pointer hover:underline';

interface SafeExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to:string;
  children: React.ReactNode;
}

const SafeExternalLink = ({ to, children, ...rest }: SafeExternalLinkProps) => (
  <a href={ to } target='_blank' rel='noopener noreferrer' className={ Style } { ...rest }>
    { children }
  </a>
);

export default SafeExternalLink;