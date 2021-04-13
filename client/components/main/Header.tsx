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

interface Props {
  isMobile: boolean;
  // isLogined: boolean;
  // user?: User;
}

interface HeaderStyleProps {
  isMobile: boolean;
  fixed: boolean;
}

interface LoginProps {
  isLogined: boolean;
  user?: User;
}

declare global {
  interface Window {
    __scrollPosition: number;
  }
}

const menuArray = [
  { name: '플랜보기', path: '/plans' },
  { name: '동행찾기', path: '/hosts' },
  { name: '공지사항', path: '/notices' },
  { name: '자유게시판', path: '/board' },
  { name: '소개', path: '/about' },
  { name: '문의하기', path: '/question' },
  { name: '유저보기', path: '/users' },
];

const HeaderDiv = styled.div<HeaderStyleProps>`
  width: ${(props) => (props.isMobile ? '100%' : '80%')};
  max-width: 1200px;
  height: ${(props) => (props.isMobile ? '2.5rem' : '4rem')};
  min-height: 2.5rem;
  max-height: 4rem;
  margin: 0 auto;
  box-sizing: border-box;

  transition: top 0.5s ease;
  background: white;
  position: sticky;
  top: ${(props) => (props.fixed ? '0' : props.isMobile ? '-2.5rem' : '-4rem')};

  display: flex;
  align-items: center;

  z-index: 10;

  /* transition: padding 0.3s ease; */

  & > button {
    width: 2.5rem;
    height: 2.5rem;
  }

  & > .white {
    position: fixed;
    top: inherit;
    left: 0;
    width: 100%;
    height: inherit;
    z-index: -2;
    background-color: white;
  }
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

const MainMenu = styled.div`
  flex: 1;
  height: 100%;
  width: 100px;

  & > nav {
    height: 100%;
    & > ul {
      list-style: none;
      height: 100%;
      margin: 0;
      padding-left: 2rem;
      white-space: nowrap;
      overflow-x: auto;

      display: flex;

      /* 스크롤 안보이기 */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
      }

      & > li {
        height: 100%;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        transition: all ease 0.3s;
        box-sizing: border-box;
        box-shadow: inset 0 0px white;

        & a {
          display: block;
        }
        &:hover {
          background: rgba(91, 115, 136, 0.1);
          /* background: linear-gradient(white, 80%, rgba(81, 151, 213, 0.1)); */
          box-shadow: inset 0 -2px #5197d5;
        }
      }
    }
  }
`;

const HamburgerMenu = styled.div`
  width: 12rem;
  & ul {
    list-style: none;
    padding: 0;
    & > li {
      padding: 0.5rem 2rem;

      & a {
        display: block;
        font-size: 1rem;
      }
      &:hover {
        background: rgba(81, 151, 213, 0.1);
      }
    }
  }
`;

const EmptyFlexDiv = styled.div`
  flex: 1;
`;

const Menu = () => (
  <nav>
    <ul>
      {menuArray.map((menu) => (
        <li key={menu.name}>
          <Link href={menu.path}>
            <a>{menu.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const LoginMenu = (props: LoginProps) => {
  const loginDrawer = useDrawer('right');
  return (
    <>
      <IconButton onClick={loginDrawer.onOpen}>
        <PersonIcon />
      </IconButton>
      <Drawer
        anchor={loginDrawer.anchor}
        open={loginDrawer.open}
        onClose={loginDrawer.onClose}
      >
        {props.isLogined ? <UserMenu /> : <Login />}
      </Drawer>
    </>
  );
};

const Header = (props: Props) => {
  const drawer = useDrawer('left');

  // const { isMobile, isLogined, user } = props;
  const { isMobile } = props;
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

  const currentUser = useContext(UserStateContext);
  const isLogined = Object.keys(currentUser).length === 0 ? false : true;

  if (isMobile) {
    return (
      <HeaderDiv isMobile={isMobile} fixed={state.isUp}>
        <IconButton>
          <MenuIcon onClick={drawer.onOpen} />
        </IconButton>
        <Drawer
          anchor={drawer.anchor}
          open={drawer.open}
          onClose={drawer.onClose}
        >
          <HamburgerMenu>
            <div>
              <EmptyFlexDiv />
              <IconButton>
                <CloseIcon onClick={drawer.onClose} />
              </IconButton>
            </div>
            <Menu />
          </HamburgerMenu>
        </Drawer>
        <EmptyFlexDiv />
        <Logo>
          <Link href='/'>
            <a>
              <img alt='mainlogo' src='/img/logos/localhostLogoBlack.png'></img>
            </a>
          </Link>
        </Logo>
        <EmptyFlexDiv />
        <LoginMenu isLogined={isLogined} />
      </HeaderDiv>
    );
  } else {
    return (
      <HeaderDiv isMobile={isMobile} fixed={state.isUp}>
        <div className='white'></div>
        <Logo>
          <Link href='/'>
            <a>
              <img alt='mainlogo' src='/img/logos/localhostLogoBlack.png'></img>
            </a>
          </Link>
        </Logo>

        <MainMenu>
          <Menu />
        </MainMenu>
        <div>
          <input placeholder='검색창' />
        </div>
        <LoginMenu isLogined={isLogined} />
      </HeaderDiv>
    );
  }
};

export default Header;
