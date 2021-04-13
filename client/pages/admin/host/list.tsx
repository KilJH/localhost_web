import { GetStaticProps } from 'next';
import { Host, User } from '../../../interfaces';
import React from 'react';
import Layout from '../../../components/main/Layout';
import SERVER from '../../../utils/url';
import axios from 'axios';
import HostPage from '../../../components/admin/host/HostPage';
import AdminLayout from '../../../components/admin/AdminLayout';

type Props = {
  pageProps: {
    items: Host[];
  };
};

const list = ({ pageProps }: Props) => (
  <Layout title='호스트관리 | localhost' isAdmin={true}>
    <AdminLayout title='호스트목록' selected='host'>
      <HostPage {...pageProps} />
    </AdminLayout>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: User[] = await (await axios.get(`${SERVER}/api/user/host/list`))
    .data.hosts;
  return { props: { items } };
};

export default list;
