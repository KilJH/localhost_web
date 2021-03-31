import { GetStaticProps } from 'next';
import { User } from '../../../interfaces';
import React from 'react';
import Layout from '../../../components/main/Layout';
import UserList from '../../../components/admin/UserList';
import SERVER from '../../../utils/url';
import axios, { AxiosResponse } from 'axios';

type Props = {
  pageProps: {
    items: User[];
  };
};

const list = ({ pageProps }: Props) => {
  let hosts: User[] = [];
  pageProps.items.map((item) =>
    axios
      .post(`${SERVER}/api/user/checkAuth`, {
        id: item.id,
      })
      .then((res: AxiosResponse<any>) => {
        if (res.data.auth === 1) hosts.push(item);
      })
  );
  return (
    <Layout title='회원목록 | localhost'>
      <UserList {...pageProps} isHost={true} />
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
