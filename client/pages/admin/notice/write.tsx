import React from 'react';
import NoticeWrite from '../../../components/admin/notice/NoticeWrite';
import Layout from '../../../components/main/Layout';

const write = () => {
  return (
    <Layout title='공지목록 | localhost'>
      <NoticeWrite />
    </Layout>
  );
};

export default write;
