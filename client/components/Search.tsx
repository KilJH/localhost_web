import React, { useState, useEffect } from 'react';
import { User } from '../interfaces';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import _app from '../pages/_app';
import Router from 'next/router';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../utils/url';

type Props = {
  // 필수 Props
  items: User[];
  // isSearching: boolean;

  // 호스트, 호스트 신청자와 일반유저 구분(선택)
  isHost?: boolean;
  isPreHost?: boolean;

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
  margin-top: ${(props: FormProps) => props.marginBottom || 0};
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
  const {
    items,
    routePage,
    selectLabel,
    inputLabel,
    buttonLabel,
    // isSearching,
    // localStorage,
  } = props;

  const sLabel = selectLabel ? selectLabel : '선택';
  let foundItems = [];

  // const localStorageItem = () => {
  //   let temp;
  //   temp = localStorage;
  //   items.map((item) => {
  //     temp.map((key) => {
  //       if (item.id.toString() == key) {
  //         foundItems.push(...foundItems, { ...item });
  //       }
  //     });
  //   });

  //   // 중복 제거
  //   const tmp = new Set(foundItems);
  //   //localItems = Array.from(tmp);
  //   //console.log(localItems);
  //   return Array.from(tmp);
  // };

  // const localItems = localStorageItem();
  // useEffect(() => {
  //   // foundItems에 찾은 정보 넣기
  //   if (localStorage.getItem('id')) {
  //     let temp;
  //     temp = localStorage.getItem('id').split(',');
  //     items.map((item) => {
  //       temp.map((key) => {
  //         if (item.id.toString() == key) {
  //           foundItems.push(...foundItems, { ...item });
  //         }
  //       });
  //     });
  //   }

  //   // 중복 제거
  //   const tmp = new Set(foundItems);
  //   localItems = Array.from(tmp);
  //   console.log(localItems);
  //   //localStorage.setItem('id', '');
  // });

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
      foundItems.splice(0, foundItems.length);
      items.filter(function (e) {
        switch (select) {
          case 1:
            if (e.email === value) console.log(foundItems);
          case 2:
            if (e.nickname === value) console.log(foundItems);
          case 3:
            if (e.name === value) {
              //foundItems.push(e.id);
              axios
                .post(`${SERVER}/api/user/search`, {
                  type: 'nickname',
                  item: e.nickname,
                })
                .then((res: AxiosResponse<any>) => {
                  console.log(res.data.users);
                  console.log('hi');
                  // if (res.data.success) {
                  //     Router.push('/');
                  //   }
                });
            }
        }
      });
    }
    // localStorage.setItem('id', foundItems.toString());
    // Router.push(routePage);
  };
  // if (isSearching) {
  //   // 검색 중일 때
  //   return (
  //     <div>
  //       <SearchForm onSubmit={onSubmit}>
  //         <SelectControl variant='outlined'>
  //           <Select
  //             value={select || ''}
  //             onChange={handleChange}
  //             defaultValue={1}
  //             inputProps={{ 'aria-label': 'Without label' }}
  //             displayEmpty
  //           >
  //             <MenuItem value='' disabled>
  //               {sLabel}
  //             </MenuItem>
  //             <MenuItem value={1}>이메일</MenuItem>
  //             <MenuItem value={2}>닉네임</MenuItem>
  //             <MenuItem value={3}>이름</MenuItem>
  //           </Select>
  //         </SelectControl>
  //         <CssTextField
  //           value={value}
  //           label={inputLabel ? inputLabel : '입력'}
  //           variant='outlined'
  //           type='text'
  //           onChange={onChangeHandler}
  //         />
  //         <SearchButton type='submit' variant='contained' color='primary'>
  //           {buttonLabel ? buttonLabel : '검색'}
  //         </SearchButton>
  //       </SearchForm>
  //       {/* <UserList {...items} /> */}
  //     </div>
  //   );
  // } else {
  // 검색 중이 아닐 때
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
// }
