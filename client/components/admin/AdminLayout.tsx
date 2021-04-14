import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../main/Footer';
import AdminHeader from './AdminHeader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AdminNav from './AdminNav';

type Props = {
  title: string;
  children?: ReactNode;
  selected?: string;
};

interface MobileProps {
  isMobile: boolean;
}
const Layout = styled.div`
  max-width: 1200px;
  display: block;
  margin: 0 auto;
  min-height: 27em;
  align-items: center;
`;
const ComponentDiv = styled.div`
  width: 100%;
  margin: 0;
  background-color: #f1f2f6;
  height: 100%;
  min-height: 100vh;
`;

const TitleDiv = styled.div`
  margin: 0 0 0 1.75em;
`;
const Title = styled.h4<MobileProps>`
  margin: 0 2em;
  padding-left: ${(props) => (props.isMobile ? '1em' : '11em')};
  padding-top: 3.5em;
  font-size: 1.1em;
  color: #5197d5;
`;
const MainComponent = styled.div<MobileProps>`
  margin: ${(props) =>
    props.isMobile ? '1em 3em 3em 3em' : '1em 3em 3em 15em'};
  padding: 2em;
  top: -4em;
  background-color: white;
  border-radius: 0.25em;
  box-shadow: 2px 2px 5px 1px gray;
  & div {
    font-size: ${(props) => (props.isMobile ? '0.6em' : '')};
    & form > div {
      &.MuiFormControl-root {
        height: ${(props) => (props.isMobile ? '4.3em' : '')};
      }
    }
    & div > div > button {
      &.MuiButton-containedPrimary {
        float: ${(props) => (props.isMobile ? 'left' : '')};
      }
    }
  }
`;
const EndHr = styled.hr`
  margin-top: 9em;
`;
const FooterDiv = styled.footer``;
export default function AdminLayout(props: Props) {
  const {
    title = '오류동에서 오류남! | 관리자 | localhost',
    children,
    selected,
  } = props;

  const isMobile = useMediaQuery('(max-width: 860px)');
  return (
    <div>
      <Head>
        <title>{title} | 관리자 | localhost</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AdminHeader />
      <Layout>
        <AdminNav selected={selected} />
        <ComponentDiv>
          <TitleDiv>
            <Title isMobile={isMobile}>{title}</Title>
          </TitleDiv>
          <MainComponent isMobile={isMobile}>{children}</MainComponent>
          <EndHr />
          <FooterDiv>
            <Footer />
          </FooterDiv>
        </ComponentDiv>
      </Layout>
    </div>
  );
}
