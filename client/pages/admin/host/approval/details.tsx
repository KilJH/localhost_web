import { GetStaticProps } from 'next';
import { Host, User } from '../../../../interfaces';
import React from 'react';
import Layout from '../../../../components/main/Layout';
import SERVER from '../../../../utils/url';
import axios from 'axios';

type Props = {
  pageProps: {
    items: Host[];
  };
};

const details = ({ pageProps }: Props) => {
  return <Layout title='신청자목록 | localhost'></Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: User[] = await (
    await axios.get(`${SERVER}/api/user/host/request/list`)
  ).data.requestedHosts;

  return { props: { items } };
};

export default details;
