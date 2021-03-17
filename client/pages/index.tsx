import Layout from '../components/main/Layout';
import { Grid } from '@material-ui/core';
import Greeting from '../components/Greeting';
import SearchDetail from '../components/SearchDetail';

const IndexPage = () => (
	<Layout title="Home | localhost👋">
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Greeting />
			</Grid>
			<Grid item xs={12} lg={4} md={6}>
				<SearchDetail />
			</Grid>
		</Grid>
	</Layout>
);

export default IndexPage;
