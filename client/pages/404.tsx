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

interface Props {
	loginProps: LoginProps;
}

export default function Error404({ loginProps }: Props) {
	return (
		<Layout title='Error | localhost' loginProps={loginProps}>
			<ErrMsg title='Error | localhost'>
				<ErrorIcon fontSize='large' />
				404 : 페이지를 찾을 수 없습니다.
			</ErrMsg>
		</Layout>
	);
}
