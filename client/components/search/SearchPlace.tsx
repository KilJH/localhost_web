import React, { useState } from 'react';
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
	height: 16em;
	overflow-y: auto;
`;

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	margin-bottom: 1rem;
	& > input {
		flex: 1;
	}
	& > button {
		margin: 0 0 0 0.5rem;
	}
`;

const PlaceItem = (props: PlaceProps) => {
	const { place, setPlace } = props;

	return (
		<ItemContainer
			onClick={() => {
				setPlace(place);
			}}
		>
			<h4>{place.name}</h4>
			<p>{place.formatted_address}</p>
		</ItemContainer>
	);
};

const SearchPlace = (props: Props) => {
	const input = useInput('');
	const { setPlace } = props;
	const [places, setPlaces] = useState([]);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		axios.get(`/api/map/searchPlaces?search=${input.value}`).then((res) => {
			setPlaces(res.data.places);
		});
	};
	return (
		<div>
			<StyledForm onSubmit={onSubmit}>
				<Input
					{...input}
					placeholder='주소를 검색해주세요'
					border='1px solid rgba(0,0,0,0.42)'
					borderRadius='0.25rem'
					textAlign='left'
				/>
				<Button type='submit' padding='0.375rem 1rem'>
					<Search />
				</Button>
			</StyledForm>
			<ListContainer>
				{places.map((place) => (
					<PlaceItem place={place} setPlace={setPlace} />
				))}
			</ListContainer>
		</div>
	);
};

export default SearchPlace;
