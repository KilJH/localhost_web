import Layout from '../components/main/Layout';
import { Grid } from '@material-ui/core';
import Greeting from '../components/Greeting';
import { GetServerSideProps } from 'next';

const IndexPage = () => {
	return (
		<Layout title='Home | localhost👋'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Greeting />
				</Grid>
			</Grid>
		</Layout>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: {} };
};
