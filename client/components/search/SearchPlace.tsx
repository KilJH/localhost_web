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
	max-height: 16em;
	overflow-y: auto;
	position: absolute;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 0.5rem;

	animation: transHeight 0.3s ease 0s;
	transition: all 0.5s ease;

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
	/* margin-bottom: 1rem; */
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
	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();
		axios.get(`/api/map/searchPlaces?search=${input.value}`).then((res) => {
			setPlaces(res.data.places);
		});
	};
	return (
		<Container>
			<StyledForm onSubmit={onSearch}>
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
			{places.length > 0 ? (
				<ListContainer>
					{places.map((place) => (
						<PlaceItem place={place} setPlace={setPlace} />
					))}
				</ListContainer>
			) : (
				''
			)}
		</Container>
	);
};

export default SearchPlace;
