import axios from 'axios';
import React, { ReactNode } from 'react';
import SERVER from '../../../utils/url';
import Router from 'next/router';
import { User } from '../../../interfaces';

// isLogined
// 0: 아무나 볼 수 있음, 1: 로그인한 회원만 볼 수 있음, 2: 게스트만 볼 수 있음

// grade
// 0: 아무나 볼 수 있음, 2: 호스트회원만 볼 수 있음, 3: 관리자회원만 볼 수 있음

const withAuth = (isLogined: number, grade: number) => (
	Component: ReactNode,
) => {
	axios.get(`${SERVER}/api/auth/check`, { withCredentials: true }).then(res => {
		const user: User = res.data.user;
		if (res.data.success) {
			console.log('로그인되어있습니다.');
			if (isLogined === 2) {
				alert('이미 로그인되어있습니다.');
				Router.push('/');
			}
			switch (grade) {
				// 아무나
				case 0:
					return Component;
				// 호스트
				case 1:
					if (user.isHost) return Component;
					alert('접근할 수 없는 페이지 입니다.');
					Router.push('/');
				// 관리자
				case 2:
					if (user.isAdmin) return Component;
					alert('접근할 수 없는 페이지 입니다.');
					Router.push('/');
			}
		} else {
			// 로그인되지않음
			console.log('로그인을 해주세요.');
			console.log(res.data.message, '이것은 에러');
			if (isLogined === 1) {
				Router.push('/login');
			} else {
				return Component;
			}
		}
	});
	return () => <></>;
};

export default withAuth;
