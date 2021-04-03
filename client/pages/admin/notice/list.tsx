import { GetStaticProps } from 'next';
import { User } from '../../../interfaces';
import React from 'react';
import Layout from '../../../components/main/Layout';
import UserList from '../../../components/admin/user/UserList';
import axios from 'axios';
import SERVER from '../../../utils/url';

type Props = {
  pageProps: {
    items: User[];
  };
};

const list = ({ pageProps }: Props) => {
  return (
    <Layout title='회원목록 | localhost'>
      <UserList {...pageProps} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = await (await axios.get(`${SERVER}/api/user/list`)).data
    .users;
  return { props: { items } };
};

export default list;
