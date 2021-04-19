import React, { ReactElement } from 'react';
import MyHosting from '../../components/host/MyHosting';
import Layout from '../../components/main/Layout';

interface Props {}

export default function myhosting({}: Props): ReactElement {
  return (
    <div>
      <Layout title='마이호스팅 | localhost'>
        <MyHosting></MyHosting>
      </Layout>
    </div>
  );
}
