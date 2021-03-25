import Layout from '../components/main/Layout';
import { Grid } from '@material-ui/core';
import Greeting from '../components/Greeting';
import { User } from '../interfaces';
import SERVER from '../utils/url';
import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import cookies from 'next-cookies';

interface Props {
	isLogined: boolean;
	user?: User;
}

const IndexPage = (props: Props) => {
	console.log(props);
	return (
		<Layout
			title='Home | localhost👋'
			isLogined={props.isLogined}
			user={props.user}
		>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Greeting />
				</Grid>
			</Grid>
		</Layout>
	);
};

export default IndexPage;
