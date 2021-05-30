export const usePreventLeave = () => {
	const listener = (e: any) => {
		// 표준에 따라 기본 동작 방지
		e.preventDefault();
		// Chrome에서는 returnValue 설정이 필요함
		e.returnValue = '';
		// 지원하지 않는 브라우저를 위한 최후의 수단
		return '';
	};
	const enablePrevent = () => {
		window.addEventListener('beforeunload', listener);
	};
	const disablePrevent = () => {
		window.removeEventListener('beforeunload', listener);
	};

	return { enablePrevent, disablePrevent };
};
