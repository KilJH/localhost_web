import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { languages } from '../../client/utils/basicData';
import LanguageTag from './LanguageTag';

interface Props {
	onChange: Function;
}

const topToBtm = (x: number, y: number) => keyframes`
  from{
    height: ${x}rem;
    padding-top: ${x === 0 ? 0 : '1rem'};
    padding-bottom: ${x === 0 ? 0 : '1rem'};
  }
  to{
    height: ${y}rem;
    padding-top: ${y === 0 ? 0 : '1rem'};
    padding-bottom: ${y === 0 ? 0 : '1rem'};
  }
`;

const Selected = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.42);
	height: 2.5rem;
	padding: 0.25rem 0.5rem;
	box-sizing: border-box;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	&:hover {
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0.87);
	}
	&:focus {
		border-width: 2px;
		border-color: rgb(58, 75, 170);
	}
	&::after {
		content: '▼';
		width: 1rem;
		height: 1rem;
		text-align: center;
		&:hover {
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.6);
		}
	}

	& .selectedLanguages {
		flex: 1;
		white-space: nowrap;
		overflow-x: hidden;
	}
`;

const LanguageSelectList = styled.div<{ open: boolean }>`
	position: absolute;
	background: white;
	padding: 1rem;
	padding-left: 0.5rem;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	z-index: 2;
	width: 9rem;
	/* height: 20rem; */
	box-sizing: border-box;
	overflow-y: auto;

	animation: ${props => (props.open ? topToBtm(0, 20) : topToBtm(20, 0))} 0.5s
		ease forwards;

	& label {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
`;

const StyledCheckbox = styled(Checkbox)`
	color: #5197d5;
`;

const LanguageSelect = (props: Props) => {
	const { onChange } = props;

	// check 상태 초기화를 위한 맵핑
	let mappedChecks = {};
	languages.forEach(lang => {
		mappedChecks = { ...mappedChecks, [lang.id]: false };
	});

	const [open, setOpen] = useState(false);
	const [checkState, setCheckState] = useState(mappedChecks);
	const [checkedLangs, setCheckedLangs] = useState<string[]>([]);

	useEffect(() => {
		const langs = languages
			.filter(lang => {
				return checkState[lang.id];
			})
			.map(lang => lang.name);
		setCheckedLangs(langs);
	}, [checkState]);

	useEffect(() => {
		onChange(checkedLangs);
	}, [checkedLangs]);

	const onOpen = () => {
		setOpen(!open);
	};
	// const onClose = () => {
	// 	setOpen(false);
	// };
	const onCheck = (id: number) => {
		setCheckState({ ...checkState, [id]: !checkState[id] });
	};
	return (
		<>
			<div style={{ position: 'relative', top: '1rem' }}>
				<LanguageSelectList open={open}>
					{languages.map(lang => (
						<label key={lang.id}>
							<StyledCheckbox
								color='primary'
								checked={checkState[lang.id]}
								onChange={() => onCheck(lang.id)}
							/>
							{lang.name}
						</label>
					))}
				</LanguageSelectList>
			</div>
			<Selected onClick={onOpen}>
				<div className='selectedLanguages'>
					{checkedLangs.length ? (
						checkedLangs.map(lang => <LanguageTag language={lang} key={lang} />)
					) : (
						<LanguageTag language='전체' />
					)}
				</div>
			</Selected>
		</>
	);
};

export default LanguageSelect;
