import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import _app from '../../pages/_app';
import { useInput } from '../../hooks/useInput';
import { Box, Divider, IconButton, InputBase, Paper } from '@material-ui/core';

type Props = {
  // 필수 Props
  options: Array<string>;
  label: Array<string>;
  onSubmit: Function;

  // 호스트, 호스트 신청자와 일반유저 구분(선택)
  isHost?: boolean;
  isPreHost?: boolean;

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
const SearchForm = styled.form<FormProps>`
  display: flex;
  margin-top: ${(props: FormProps) => props.marginTop || 0};
  margin-bottom: ${(props: FormProps) => props.marginBottom || 0};
  margin-left: ${(props: FormProps) => props.marginLeft || 0};
  margin-right: ${(props: FormProps) => props.marginRight || 0};
`;

const SelectControl = styled(FormControl)`
  &.MuiFormControl-root {
    width: 20%;
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

const CssInputBase = styled(InputBase)`
  width: 90%;
  margin-left: 1rem;
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
const PaperForm = styled(Paper)`
  display: flex;
  align-items: center;
  width: 80%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  &.MuiPaper-elevation1 {
    box-shadow: none;
  }
  &:hover {
    border-color: rgb(0, 0, 0);
  }
  &:focus-within {
    border: 2px solid rgb(81, 151, 213);
  }
`;

export default function Search(props: Props) {
  const {
    options,
    label,
    selectLabel,
    inputLabel,
    buttonLabel,
    onSubmit,
  } = props;

  const sLabel = selectLabel ? selectLabel : '선택';
  const item = useInput('');
  const type = useInput('nickname');

  return (
    <SearchForm
      onSubmit={(e: React.FormEvent) => {
        onSubmit(e, type.value, item.value);
      }}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
    >
      <SelectControl variant='outlined'>
        <Select
          //defaultValue={1}
          {...type}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          // {...type}
        >
          <MenuItem value='' disabled>
            {sLabel}
          </MenuItem>
          {options.map((op, i) => (
            <MenuItem value={op}>{label[i]}</MenuItem>
          ))}
        </Select>
      </SelectControl>
      <PaperForm component='form'>
        <CssInputBase
          // onChange={onTextChange}
          {...item}
          placeholder={inputLabel ? inputLabel : '입력'}
          type='text'
          // {...item}
        />

        <IconButton type='submit'>
          <SearchIcon />
        </IconButton>
      </PaperForm>
    </SearchForm>
  );
}
// }
