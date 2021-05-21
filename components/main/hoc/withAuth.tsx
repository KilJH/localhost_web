import axios from 'axios';
import React from 'react';
import { User } from '../../../interfaces';
import { useAsync } from 'react-async';
import Loading from '../../reuse/Loading';

// isLogined
// 0: 아무나 볼 수 있음, 1: 로그인한 회원만 볼 수 있음, 2: 게스트만 볼 수 있음

// grade
// 0: 아무나 볼 수 있음, 1: 호스트회원만 볼 수 있음, 2: 관리자회원만 볼 수 있음

const getAuth = async () => {
	const res = await axios.get(`/api/auth/check`, {
		withCredentials: true,
	});

	return res.data;
};

const withAuth =
	(isLogined: number, grade: number) =>
	(Component: React.ComponentType<any>) => {
		return props => {
			const { data, isLoading, error } = useAsync({
				promiseFn: getAuth,
			});

			if (isLoading) return <Loading />;
			if (error) return <div>에러!</div>;
			if (!data) return null;

			const user: User = data.user;
			if (data.success) {
				console.log('로그인되어있습니다.');
				if (isLogined === 2) {
					alert('이미 로그인되어있습니다.');
					location.href = '/';
					return <Loading />;
				}
				switch (grade) {
					// 아무나
					case 0:
						return <Component {...props} />;
					// 호스트
					case 1:
						if (user.isHost) return <Component {...props} />;
						alert('권한이 없습니다. 호스트 신청을 해주세요:D');
						location.href = '/';
						break;
					// 관리자
					case 2:
						if (user.isAdmin) return <Component {...props} />;
						alert('접근할 수 없는 페이지 입니다.');
						location.href = '/';
						break;
				}
			} else {
				// 로그인되지않음
				console.log('로그인을 해주세요.');

				if (isLogined === 1) {
					alert('로그인을 해주세요.');
					location.href = '/login';
				} else {
					return <Component {...props} />;
				}
			}

			return <Loading />;
		};
	};

export default withAuth;
