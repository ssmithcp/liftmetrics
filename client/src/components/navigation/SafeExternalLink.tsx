export const Style = 'text-primary cursor-pointer hover:underline';

const SafeExternalLink = ({ to, children }: { to:string; children: React.ReactNode }) => (
  <a href={ to } target='_blank' rel='noopener noreferrer' className={ Style }>
    { children }
  </a>
);

export default SafeExternalLink;