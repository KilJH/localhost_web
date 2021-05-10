import React from 'react';

interface Props {
	id: string;
}

const MyBoard = (props: Props) => {
	return <section id={props.id}></section>;
};

export default MyBoard;
