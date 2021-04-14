import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import checkScrollDirection from '../../utils/checkScrollDirection';
import ScrollContext from '../../context/scroll';
import AdminMobileNav from './AdminMobileNav';

type Props = {
  isUp: boolean;
  isMobile: boolean;
  selected: string;
};

interface HeaderStyleProps {
  fixed: boolean;
}

const Header = styled.div<HeaderStyleProps>`
  width: 100%;
  max-width: 1200px;
  height: 4rem;
  min-height: 2.5rem;
  max-height: 4rem;
  margin: 0 auto;
  box-sizing: border-box;

  transition: top 0.5s ease;
  background-color: rgb(33, 33, 33);
  position: sticky;
  top: ${(props) => (props.fixed ? '0' : '-4rem')};

  display: block;
  align-items: center;

  z-index: 10;
`;
const Logo = styled.div`
  height: 100%;
  max-height: 3.5rem;
  cursor: pointer;
  transition: opacity ease 0.3s;

  box-sizing: border-box;
  padding: 0.25rem 0;

  & > a > img {
    height: 100%;
    display: block;
    margin: auto;
  }

  &:hover {
    opacity: 65%;
  }
`;

const AdminHeader = (props: Props) => {
  return (
    <Header fixed={props.isUp}>
      <Logo>
        <Link href='/'>
          <a>
            <img alt='mainlogo' src='/img/logos/localhostLogoWhite.png'></img>
          </a>
        </Link>
      </Logo>
      {!props.isMobile || <AdminMobileNav selected={props.selected} />}
    </Header>
  );
};
{
}
export default AdminHeader;
