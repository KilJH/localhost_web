import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

function getfileSize(x) {
	const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const e = Math.floor(Math.log(x) / Math.log(1024));
	return (x / Math.pow(1024, e)).toFixed(2) + ' ' + s[e];
}

interface Props {
	images: File[];
	setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

interface ItemProps {
	img: File;
	onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const ItemContainer = styled.div`
	display: inline-block;
	width: 8rem;
	height: 10rem;
	margin: 0.25rem;
	overflow: hidden;
	text-align: center;
	& img {
		width: 8rem;
		height: 8rem;
		width: 100%;
		object-fit: cover;
	}
	& .filename {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 0.8em;
		color: #333;
	}
	& .size {
		font-size: 0.6em;
		color: #333;
	}
	& .deleteBtn {
		position: relative;
		top: 0;
		left: 0;
		& button {
			padding: 0.25rem;
			position: absolute;
			left: 0;
			top: 0;
		}
	}
`;

const ListContainer = styled.div`
	width: 100%;
	overflow-x: auto;
	white-space: nowrap;
`;

const ImageItem = ({ img, onDelete }: ItemProps) => {
	const [base64, setBase64] = useState<string>('');

	const reader = new FileReader();
	reader.onload = e => setBase64(e.target?.result as string);

	reader.readAsDataURL(img);

	const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		const container = e.currentTarget!.parentElement!;
		container.style.opacity = '0.8';
	};
	const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		const container = e.currentTarget!.parentElement!;
		container.style.opacity = '1';
	};

	return (
		<ItemContainer>
			<div
				className='deleteBtn'
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<button onClick={onDelete}>
					<CloseIcon fontSize='small' />
				</button>
			</div>
			<img src={base64} />
			<div className='filename'>{img.name}</div>
			<div className='size'>{getfileSize(img.size)}</div>
		</ItemContainer>
	);
};

const WritingImages = (props: Props) => {
	const { images, setImages } = props;

	const onDelete = i => {
		const newImages1 = images.slice(0, i);
		const newImages2 = images.slice(i + 1, images.length);

		setImages([...newImages1, ...newImages2]);
	};

	return (
		<ListContainer>
			{images.map((img, i) => {
				return (
					<ImageItem
						img={img}
						onDelete={() => {
							onDelete(i);
						}}
						key={i}
					/>
				);
			})}
		</ListContainer>
	);
};

export default WritingImages;
