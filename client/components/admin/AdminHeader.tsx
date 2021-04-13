/* eslint-disable jsx-a11y/anchor-is-valid */
import { Drawer, IconButton } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
import { User } from '../../interfaces';
// Mobile
import MenuIcon from '@material-ui/icons/Menu';
import { useDrawer } from '../../hooks/useDrawer';
import CloseIcon from '@material-ui/icons/Close';
import Login from '../user/Login';
import UserMenu from '../user/UserMenu';
import checkScrollDirection from '../../utils/checkScrollDirection';
import ScrollContext from '../../context/scroll';
import { UserStateContext } from '../../context/user';

interface HeaderStyleProps {
  fixed: boolean;
}

const AdminDiv = styled.div<HeaderStyleProps>`
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
  const { state, actions } = useContext(ScrollContext);
  const onScroll = () => {
    actions.setIsUp(checkScrollDirection());
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AdminDiv fixed={state.isUp}>
      <Logo>
        <Link href='/'>
          <a>
            <img alt='mainlogo' src='/img/logos/localhostLogoWhite.png'></img>
          </a>
        </Link>
      </Logo>
    </AdminDiv>
  );
};

export default AdminHeader;
