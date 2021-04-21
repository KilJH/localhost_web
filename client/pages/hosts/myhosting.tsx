import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import MyHosting from '../../components/host/MyHosting';
import Layout from '../../components/main/Layout';
import { Host } from '../../interfaces';
import SERVER from '../../utils/url';

interface Props {
  pageProps: {
    host: Host;
  };
}

const myhosting = ({ pageProps }: Props) => {
  return (
    <div>
      <Layout title='나의 호스팅 | localhost'>
        <MyHosting host={pageProps.host[0]} />
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // 로그인 유저 id 가져오기
  const res = await axios.post(
    `${SERVER}/api/auth/check`,
    { token: ctx.req.cookies.token },
    { withCredentials: true }
  );
  const userId = res.data.user.id;

  const resLoadHost = await axios.post(`${SERVER}/api/host/load`, {
    id: userId,
  });
  const host = resLoadHost.data.host;
  return { props: { host } };
};
export default myhosting;
