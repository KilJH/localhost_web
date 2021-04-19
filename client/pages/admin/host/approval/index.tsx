import { GetStaticProps } from 'next';
import { Host, User } from '../../../../interfaces';
import React from 'react';
import SERVER from '../../../../utils/url';
import axios from 'axios';
import HostApprovalList from '../../../../components/admin/host/approval/HostApprovalList';
import AdminLayout from '../../../../components/admin/AdminLayout';

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

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.

	const items: User[] = await (
		await axios.get(`${SERVER}/api/host/request/list`)
	).data.requestedHosts;

	return { props: { items } };
};

export default index;
