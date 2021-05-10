import React, { Dispatch, ReactNode, useEffect } from 'react';
import { AsyncOptions, useAsync } from 'react-async';
import Loading from './Loading';

interface Props {
	asyncOption: AsyncOptions<unknown>;
	setState: Dispatch<React.SetStateAction<any>>;
	children: ReactNode;
}

const AsyncWrapper = (props: Props) => {
	const { asyncOption, setState, children } = props;
	const { data, error, isLoading } = useAsync(asyncOption);

	useEffect(() => {
		setState(data);
	}, [data]);

	if (isLoading) return <Loading />;
	if (error)
		return (
			<div style={{ fontSize: '0.5em', color: '#e74c3c' }}>!!!에러!!!</div>
		);
	if (!data) return null;

	return <>{children}</>;
};

export default AsyncWrapper;
