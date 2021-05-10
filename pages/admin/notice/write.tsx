import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import NoticeWrite from '../../../components/admin/notice/NoticeWrite';

const write = () => {
	return (
		<AdminLayout title='공지작성' selected='notice'>
			<NoticeWrite />
		</AdminLayout>
	);
};

export default write;
