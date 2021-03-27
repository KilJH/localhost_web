import Layout from '../components/main/Layout';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';
import { LoginProps, User } from '../interfaces/index';

const ErrMsg = styled.div`
	padding: 15rem 0;
	text-align: center;
	font-size: 2em;
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface Props {}

export default function Error404(props: Props) {
	return (
		<Layout title='Error | localhost'>
			<ErrMsg title='Error | localhost'>
				<ErrorIcon fontSize='large' />
				404 : 페이지를 찾을 수 없습니다.
			</ErrMsg>
		</Layout>
	);
}
