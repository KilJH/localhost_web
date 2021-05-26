import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
	images: string[];
	setThumb: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
	width: 100%;
	height: calc(8rem + 8px);
	overflow: auto;
	overflow-x: auto;
	overflow-y: hidden;
	margin-bottom: 1rem;
	white-space: nowrap;

	&::-webkit-scrollbar {
		/* display: none; */
		height: 8px;
		opacity: 0;
	}
	&::-webkit-scrollbar-thumb {
		background-color: gray;
		border-radius: 1rem;
		/* height: 2px; */
		&:hover {
			background: rgba(33, 33, 33, 0.75);
		}
	}
	&::-webkit-scrollbar-track {
		border-radius: 3.5px;
		background-color: #eee;
		display: none;
		opacity: 0;
	}

	& > img {
		cursor: pointer;
		width: 8rem;
		height: 8rem;
		object-fit: cover;

		/* opacity: 0.33; */
		filter: brightness(50%);

		transition: all 0.2s ease;
		&:hover {
			/* opacity: 0.9; */
			filter: brightness(90%);
		}

		&.selected {
			opacity: 1;
			filter: brightness(100%);
		}
	}
`;

const ThumbnailPicker = (props: Props) => {
	const { images, setThumb } = props;
	const [index, setIndex] = useState(0);

	const onClick = (i, img) => {
		setIndex(i);
		setThumb(img);
	};

	useEffect(() => {
		setThumb(images[0] ?? '');
	}, []);
	return (
		<div style={{ width: '100%' }}>
			<h2 style={{ margin: '0.5rem 0' }}>썸네일 사진을 골라주세요</h2>
			<Container>
				{images?.map((image, i) => {
					return (
						<img
							src={image}
							className={index === i ? 'selected' : ''}
							onClick={() => onClick(i, image)}
						/>
					);
				})}
			</Container>
		</div>
	);
};

export default ThumbnailPicker;
