import { NavLink } from 'react-router-dom';
import { Route } from '.';

import { Style } from './SafeExternalLink';

interface IntrnalLinkProps {
  route?: Route;
  to?: string;
  children?: React.ReactNode;
  className?: string;
}

const InternalLink = ({ route, to, children, className = ''}: IntrnalLinkProps) => (
  (route
    ? (
      <NavLink to={ route.path } className={ `${ Style } ${ className }` }>
        { route.title }
      </NavLink>
    )
    : (
      <NavLink to={ to || '' } className={ `${ Style } ${ className }` }>
        { children }
      </NavLink>
    )
  )
);

export default InternalLink;