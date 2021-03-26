// if (typeof window !== 'undefined') {
// 	window.__scrollPosition = document.documentElement.scrollTop || 0;
// }
export let scrollPosition =
	typeof document === undefined ? document.documentElement.scrollTop : 0;

const checkScrollDirection = () => {
	let _documentY = document.documentElement.scrollTop;
	let _direction = _documentY - scrollPosition >= 0 ? false : true;

	scrollPosition = _documentY;

	return _direction;
};

export default checkScrollDirection;
