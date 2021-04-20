import React, { useEffect, useState } from 'react';
import { Place } from '../../interfaces';
import styled from 'styled-components';
import Button from '../reuse/Button';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import { Search } from '@material-ui/icons';
import Input from '../reuse/Input';

interface Props {
	setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

interface PlaceProps {
	place: Place;
	setPlace: React.Dispatch<React.SetStateAction<Place>>;
	onClose: Function;
}

const ItemContainer = styled.div`
	padding: 1rem;
	& h4,
	p {
		margin: 0;
	}
	&:hover {
		cursor: pointer;
		background: #eee;
	}
`;

const ListContainer = styled.div`
	max-height: 16em;
	overflow-y: auto;
	position: absolute;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 0.5rem;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

	transition: all 0.5s ease;

	& > div {
		animation: transHeight 0.3s ease 0s;
	}
	@keyframes transHeight {
		from {
			max-height: 0;
		}
		to {
			max-height: 16em;
		}
	}
`;

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	& > input {
		flex: 1;
	}
	& > button {
		margin: 0 0 0 0.5rem;
	}
`;

const Container = styled.div`
	width: 100%;
	position: relative;
	z-index: 8;
`;

const PlaceItem = (props: PlaceProps) => {
	const { place, setPlace, onClose } = props;

	return (
		<ItemContainer
			onClick={() => {
				setPlace(place);
				onClose();
			}}
			className='placeItem'
		>
			<h4 className='placeItem'>{place.name}</h4>
			<p className='placeItem'>{place.formatted_address}</p>
		</ItemContainer>
	);
};

const SearchPlace = (props: Props) => {
	const input = useInput('');
	const { setPlace } = props;
	const [places, setPlaces] = useState([]);
	const [open, setOpen] = useState(false);
	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();
		axios.get(`/api/map/searchPlaces?search=${input.value}`).then((res) => {
			setPlaces(res.data.places);
			handleOpen();
		});
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', (e: any) => {
			if (!e.target.classList.value.includes('placeItem')) {
				handleClose();
			}
		});
	}, []);

	return (
		<Container id='searchPlaces'>
			<StyledForm
				onSubmit={onSearch}
				onClick={handleOpen}
				className='placeItem'
			>
				<Input
					{...input}
					placeholder='주소를 검색해주세요'
					border='1px solid rgba(0,0,0,0.42)'
					borderRadius='0.25rem'
					textAlign='left'
					className='placeItem'
				/>
				<Button type='submit' padding='0.375rem 1rem' className='placeItem'>
					<Search />
				</Button>
			</StyledForm>
			<ListContainer id='placesList' onBlur={handleClose}>
				{places.length > 0 && open ? (
					<div>
						{places.map((place) => (
							<PlaceItem
								place={place}
								setPlace={setPlace}
								onClose={handleClose}
								key={place.name}
							/>
						))}
					</div>
				) : (
					''
				)}
			</ListContainer>
		</Container>
	);
};

export default SearchPlace;
