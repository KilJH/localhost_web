import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import NoticeWrite from '../../../components/admin/notice/NoticeWrite';
import withAuth from '../../../components/main/hoc/withAuth';

const write = () => {
	return (
		<AdminLayout title='공지작성' selected='notice'>
			<NoticeWrite />
		</AdminLayout>
	);
};

export default withAuth(1, 2)(write);
