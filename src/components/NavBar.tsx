import React from 'react';

export function NavBar({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <nav className="nav-bar">{children}</nav>;
}
