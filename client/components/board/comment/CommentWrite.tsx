import React from 'react';
import styled from 'styled-components';

interface Props {}

const WriterContainer = styled.div`
	margin: 1rem 0 0.5rem 0;
	position: relative;
	& textarea {
		width: 100%;
		display: block;
		resize: none;
		height: 8em;
		border-radius: 0.25rem;

		transition: all 0.2s ease;
		&:focus {
			outline: none;
			border: 1px solid rgba(0, 0, 0, 0);
			box-shadow: 0px 0px 0px 2px #5197d5;
		}
	}
	& button[type='submit'] {
		background-color: #5197d5;
		color: white;
		border: none;
		position: absolute;
		right: 0.25rem;
		bottom: 0.5rem;
		width: 4em;
		transition: all 0.2s ease;
		&:hover {
			background-color: rgb(67, 82, 175);
		}
	}
`;

const CommentWrite = (props: Props) => {
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<WriterContainer onSubmit={onSubmit}>
			<form>
				<textarea />

				<button type='submit'>작성</button>
			</form>
		</WriterContainer>
	);
};

export default CommentWrite;
