import { GetServerSideProps } from 'next';
import { Host } from '../../../../interfaces';
import React from 'react';
import SERVER from '../../../../client/utils/url';
import axios from 'axios';
import HostApprovalList from '../../../../components/admin/host/approval/HostApprovalList';
import AdminLayout from '../../../../components/admin/AdminLayout';
import withAuth from '../../../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		items: Host[];
	};
};

const index = ({ pageProps }: Props) => {
	return (
		<AdminLayout title='호스트 신청자목록' selected='approval'>
			<HostApprovalList {...pageProps} />
		</AdminLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const items: Host[] = await (
		await axios.get(`${SERVER}/api/host/request/list`)
	).data.requestedHosts;
	return { props: { items } };
};

export default withAuth(1, 2)(index);
