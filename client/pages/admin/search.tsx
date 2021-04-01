import { GetStaticProps } from 'next';
import { User } from '../../interfaces';
import React from 'react';
import Layout from '../../components/main/Layout';
import UserList from '../../components/admin/user/UserList';
import SERVER from '../../utils/url';
import axios, { AxiosResponse } from 'axios';
import Search from '../../components/Search';

type Props = {
  pageProps: {
    items: User[];
  };
};

const list = ({ pageProps }: Props) => {
  return (
    <Layout title='신청자목록 | localhost'>
      <Search
        items={pageProps.items}
        selectLabel='검색할 값'
        inputLabel='을 입력하세요.'
        buttonLabel='검색!'
        routePage='http://localhost:3000/admin/search/'
        marginTop='5rem'
        isSearching={true}
      />
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
