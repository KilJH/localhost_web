import Layout from '../components/main/Layout';
import { Grid } from '@material-ui/core';
import Greeting from '../components/Greeting';
import { LoginProps, User } from '../interfaces';
import { GetServerSideProps, GetStaticProps } from 'next';
import withAuth from '../components/main/hoc/withAuth';

interface Props {}

const IndexPage = (props: Props) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: {} };
};

export default IndexPage;
