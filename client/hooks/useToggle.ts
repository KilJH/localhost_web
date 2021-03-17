import { useEffect, useRef, useState } from 'react';

export const useToggle = (initialValue: boolean, name?: string) => {
	const [value, setValue] = useState(initialValue);

	// useEffect 에서 DOM 객체 조작을 위한 ref 설정
	// useRef() 안의 인자는 Typescript 에러검출에서 undefined 를 피하기 위한 객체 생성
	const ref = useRef<HTMLSpanElement>(null);

	const onClick = (e: any) => {
		setValue(!value);
	};

	useEffect(() => {
		// toggle-on 클래스를 value값에 따라 추가, 삭제
		ref.current?.classList.toggle('toggle-on', value);

		// name 값이 존재한다면 name 클래스도 추가, 삭제
		if (name) ref.current?.classList.toggle(name, value);
	}, [value]);

	return { value, onClick, ref };
};
