import React, { useState } from 'react';
import { User } from '../interfaces';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import _app from '../pages/_app';
import Router from 'next/router';

type Props = {
  items: User[];

  // 라우팅할 페이지
  routePage: string;

  // 라벨
  selectLabel?: string;
  inputLabel?: string;
  buttonLabel?: string;

  // 스타일링
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
};

// 검색 폼 전체 Props
interface FormProps {
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
}

// 검색 바디
const SearchForm = styled.form`
  display: flex;
  margin-top: ${(props: FormProps) => props.marginTop || 0};
  margin-bottom: ${(props: FormProps) => props.marginBottom || 0};
  margin-left: ${(props: FormProps) => props.marginLeft || 0};
  margin-right: ${(props: FormProps) => props.marginRight || 0};
`;

const SelectControl = styled(FormControl)`
  &.MuiFormControl-root {
    width: 25%;
    margin-right: 0.5rem;
  }
  & .MuiOutlinedInput-root {
    height: -webkit-fill-available;
    &.hover fieldset {
      border-color: rgb(81, 151, 213);
    }
    &.Mui-focused fieldset {
      border-color: rgb(81, 151, 213);
    }
  }
`;

const CssTextField = styled(TextField)`
  &.MuiFormControl-root {
    width: 55%;
    margin-right: 0.5rem;
  }
  & .MuiOutlinedInput-root {
    height: -webkit-fill-available;
    &.hover fieldset {
      border-color: rgb(81, 151, 213);
    }
    &.Mui-focused fieldset {
      border-color: rgb(81, 151, 213);
    }
  }
`;

const SearchButton = styled(Button)`
  &.MuiButton-root {
    width: 20%;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;

export default function Search(props: Props) {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState(null);
  const { items, routePage, selectLabel, inputLabel, buttonLabel } = props;
  const sLabel = selectLabel ? selectLabel : '선택';
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(event.target.value);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    searchValue(value);
  };

  const searchValue = (value: string) => {
    if (select === null) alert('옵션을 선택해주세요.');
    else {
      let id = null;
      items.map((item) => {
        switch (select) {
          case 1:
            if (item.email == value) id = item.id;
          case 2:
            if (item.nickname == value) id = item.id;
          case 3:
            if (item.name == value) id = item.id;
          default:
            break;
        }
      });
      if (id) Router.push(routePage + id);
      else alert('일치하는 조건이 없습니다.');
    }
  };
  return (
    <SearchForm onSubmit={onSubmit}>
      <SelectControl variant='outlined'>
        <Select
          value={select || ''}
          onChange={handleChange}
          defaultValue={1}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
        >
          <MenuItem value='' disabled>
            {sLabel}
          </MenuItem>
          <MenuItem value={1}>이메일</MenuItem>
          <MenuItem value={2}>닉네임</MenuItem>
          <MenuItem value={3}>이름</MenuItem>
        </Select>
      </SelectControl>
      <CssTextField
        value={value}
        label={inputLabel ? inputLabel : '입력'}
        variant='outlined'
        type='text'
        onChange={onChangeHandler}
      />
      <SearchButton type='submit' variant='contained' color='primary'>
        {buttonLabel ? buttonLabel : '검색'}
      </SearchButton>
    </SearchForm>
  );
}
