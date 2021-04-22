import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
	currentIdx: number;
	lastIdx: number;
	url?: string; // 클라이언트의 주소
	api?: string; // 데이터를 요청할 API 주소
	setItems?: Function;
}

const PageButton = styled.li`
	margin: 0 0.25rem;
	& button {
		border: none;
		padding: 0;
		width: 2.5em;
		height: 2.5em;
		border-radius: 50%;
		transition: all 0.2s ease;
		&.current {
			background-color: rgb(81, 151, 213);
			color: white;
			&:hover {
				background-color: rgb(81, 151, 213);
				cursor: default;
			}
		}
		&:hover {
			background-color: rgba(81, 151, 213, 0.3);
		}
	}
`;

const Container = styled.nav`
	& ul {
		margin: 0 auto;
		width: 16em;
		padding: 0;
		list-style: none;
		display: flex;
		justify-content: center;
	}
`;

const Pagination = (props: Props) => {
	const { currentIdx, lastIdx, url, api, setItems } = props;
	// index = 1 ~ m

	const onClick = async (idx: number) => {
		const res = await axios.get(`${api}?page=${idx}`);

		setItems(res.data.list);
	};

	let idxs = [];
	if (lastIdx < 5) {
		for (let i = 0; i < lastIdx; i++) {
			idxs = [...idxs, i + 1];
		}
	} else if (currentIdx < 3) {
		// 1. index 1,2면 5까지
		idxs = [1, 2, 3, 4, 5];
	} else if (currentIdx > lastIdx - 2) {
		// 2. 그 중간이면 n-2 ~ n+2
		idxs = [lastIdx - 4, lastIdx - 3, lastIdx - 2, lastIdx - 1, lastIdx];
	} else {
		// 3. m, m-1이면 m-4 ~ m
		idxs = [
			currentIdx - 2,
			currentIdx - 1,
			currentIdx,
			Number(currentIdx) + 1,
			Number(currentIdx) + 2,
		];
	}

	return (
		<Container>
			<ul>
				<PageButton>
					<Link href={`${url}?page=${1}`}>
						<button
							onClick={() => {
								onClick(1);
							}}
						>
							&lt;
						</button>
					</Link>
				</PageButton>
				{idxs.map(idx =>
					idx == currentIdx ? (
						<PageButton key={idx}>
							<button className='current'>{idx}</button>
						</PageButton>
					) : (
						<PageButton key={idx}>
							<Link href={`${url}?page=${idx}`}>
								<button
									onClick={() => {
										onClick(idx);
									}}
								>
									{idx}
								</button>
							</Link>
						</PageButton>
					),
				)}

				<PageButton>
					<Link href={`${url}?page=${lastIdx}`}>
						<button
							onClick={() => {
								onClick(lastIdx);
							}}
						>
							&gt;
						</button>
					</Link>
				</PageButton>
			</ul>
		</Container>
	);
};

export default Pagination;
