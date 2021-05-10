import Layout from '../components/main/Layout';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const ErrMsg = styled.div`
	padding: 15rem 0;
	text-align: center;
	& > div {
		font-size: 2em;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& a {
		display: block;
	}
`;

export default function Error404() {
	return (
		<Layout title='Error | localhost'>
			<ErrMsg>
				<div>
					<ErrorIcon fontSize='large' />
					404 : 페이지를 찾을 수 없습니다.
				</div>
				<Link href='/'>
					<a>
						<Button variant='outlined'>홈으로</Button>
					</a>
				</Link>
			</ErrMsg>
		</Layout>
	);
}
