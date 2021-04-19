import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectInput from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Host } from '../../interfaces';
import { useInput } from './../../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Input from '../reuse/Input';
import SearchPlace from '../search/SearchPlace';
import Fade from '@material-ui/core/Fade';
import { Place } from '../../interfaces';
import Modal from '@material-ui/core/Modal';
import ReuseButton from '../reuse/Button';
import axios from 'axios';
import Router from 'next/router';
import SERVER from '../../utils/url';

interface Props {
  host: Host;
}

const Label = styled.p`
  margin: 2em 0 0.5em 0;
`;

const ButtonLabel = styled.p`
  margin: 2em 0 0.5em 0;
  cursor: pointer;
`;

const SwitchForm = styled(FormControlLabel)`
  &.MuiFormControlLabel-labelPlacementStart {
    margin-left: 0;
  }
`;

const IsOn = styled(Switch)`
  & .MuiSwitch-colorPrimary.Mui-checked {
    color: #5197d5;
  }
  & .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: #5197d5;
  }
`;

const DescriptionField = styled(TextField)`
  &.MuiFormControl-root {
    width: 100%;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  & .searchForm {
    width: 80vw;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: 0.25rem;
    outline: 0;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
  }
`;
const UpdateButton = styled(ReuseButton)`
  margin: 5em auto 2em auto;
  display: flex;
`;
const DialogueTitle = styled(DialogTitle)`
  color: rgb(33, 33, 33);

  & .MuiTypography-h6 {
    font-size: 0.95em;
    font-weight: bold;
  }
  &.MuiDialogTitle-root {
    padding: 2em 6em;
  }
`;
const RadioLabel = styled(FormControlLabel)`
  & .MuiRadio-colorSecondary.Mui-checked {
    color: #5197d5;
    &:hover {
      background-color: rgba(81, 151, 213, 0.1);
    }
  }
  & .MuiButtonBase-root {
    &:hover {
      color: #5197d5;
      background-color: rgba(81, 151, 213, 0.1);
    }
  }
  &:hover {
    color: #5197d5;
  }
`;
const LanguageControl = styled(FormControl)`
  width: 7em;
`;
export default function MyHosting({ host }: Props): ReactElement {
  const [isOn, setIsOn] = React.useState(host[0].on);
  const [country, setCountry] = React.useState(host[0].country);
  const [language, setLanguage] = React.useState({
    language1: host[0].language1 === null ? ' ' : host[0].language1,
    language2: host[0].language2 === null ? ' ' : host[0].language2,
    language3: host[0].language3 === null ? ' ' : host[0].language3,
  });

  const description = useInput(host[0].description);
  const [place, setPlace] = useState<Place>({
    name: '',
    formatted_address: '',
    geometry: { location: { lat: host[0].latitude, lng: host[0].longitude } },
  });
  const [languageSave, setLanguageSave] = React.useState(language);
  const [countrySave, setCountrySave] = React.useState(country);

  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);
  const [placeOpen, setPlaceOpen] = useState(false);

  const countries = [
    '대한민국',
    '일본',
    '중국',
    '베트남',
    '태국',
    '프랑스',
    '영국',
    '독일',
    '포르투갈',
    '스페인',
    '이탈리아',
  ];
  let languages = [
    '한국어',
    '일본어',
    '중국어',
    '영어',
    '프랑스어',
    '독일어',
    '스페인어',
    '포르투갈어',
    '힌디어',
  ];
  const handlecountryOpen = () => {
    setCountryOpen(true);
  };
  const handleCountryClose = () => {
    setCountrySave(country);
    setCountryOpen(false);
  };
  const handleCountryCancle = () => {
    setCountry(countrySave);
    setCountryOpen(false);
  };

  const handlelanguageOpen = () => {
    setLanguageOpen(true);
  };
  const handleLanguageClose = () => {
    setLanguageSave(language);
    setLanguageOpen(false);
  };
  const handleLanguageCancle = () => {
    setLanguage(languageSave);
    setLanguageOpen(false);
  };

  const handlePlaceOpen = () => {
    setPlaceOpen(true);
  };
  const handlePlaceClose = () => {
    setPlaceOpen(false);
  };

  const language1HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === ' ') {
      if (
        event.target.value === ' ' &&
        language.language2 === ' ' &&
        language.language3 === ' '
      )
        alert('최소 언어 하나를 선택해주시기 바랍니다.');
      else {
        setLanguage({
          language1: event.target.value,
          language2: language.language2,
          language3: language.language3,
        });
      }
    } else if (
      event.target.value === language.language2 ||
      event.target.value === language.language3
    )
      alert('중복된 언어를 선택하셨습니다.');
    else {
      setLanguage({
        language1: event.target.value,
        language2: language.language2,
        language3: language.language3,
      });
    }
  };
  const language2HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === ' ') {
      if (
        event.target.value === ' ' &&
        language.language1 === ' ' &&
        language.language3 === ' '
      )
        alert('최소 언어 하나를 선택해주시기 바랍니다.');
      else {
        setLanguage({
          language1: language.language1,
          language2: event.target.value,
          language3: language.language3,
        });
      }
    } else if (
      event.target.value === language.language1 ||
      event.target.value === language.language3
    )
      alert('중복된 언어를 선택하셨습니다.');
    else {
      setLanguage({
        language1: language.language1,
        language2: event.target.value,
        language3: language.language3,
      });
    }
  };
  const language3HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === ' ') {
      if (
        event.target.value === ' ' &&
        language.language1 === ' ' &&
        language.language2 === ' '
      )
        alert('최소 언어 하나를 선택해주시기 바랍니다.');
      else {
        setLanguage({
          language1: language.language1,
          language2: language.language2,
          language3: event.target.value,
        });
      }
    } else if (
      event.target.value === language.language1 ||
      event.target.value === language.language2
    )
      alert('중복된 언어를 선택하셨습니다.');
    else {
      setLanguage({
        language1: language.language1,
        language2: language.language2,
        language3: event.target.value,
      });
    }
  };
  console.log(host[0]);
  const isOnHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isOn === 0) setIsOn(1);
    else setIsOn(0);
  };
  const countryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry((event.target as HTMLInputElement).value);
  };

  const onSubmitHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('hi');
    try {
      const res = await axios.post(`${SERVER}/api/host/update`, {
        on: isOn,
        country: country,
        language1: language.language1 === ' ' ? null : language.language1,
        language2: language.language2 === ' ' ? null : language.language2,
        language3: language.language3 === ' ' ? null : language.language3,
        description: description.value,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        address: place.formatted_address,

        id: host[0].id,
        reqCountry: host[0].reqcountry,
      });
      if (res.data.success) {
        alert('호스트 정보 수정이 완료되었습니다!');
        Router.push('/');
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div>
      <h3>마이 호스팅</h3>

      {/* 호스트 설정 */}
      <Label>호스트 활성</Label>
      <SwitchForm
        control={
          <IsOn checked={isOn} onChange={isOnHandleChange} color='primary' />
        }
        label=''
      />

      {/* 국가 선택 */}
      <ButtonLabel onClick={handlecountryOpen}>국가 선택</ButtonLabel>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={countryOpen}
        onClose={handleCountryClose}
      >
        <DialogueTitle>거주 국가를 선택해주세요</DialogueTitle>
        <DialogContent>
          <form>
            <RadioGroup value={country} onChange={countryHandleChange}>
              {countries.map((value) => (
                <RadioLabel
                  value={value}
                  control={<Radio />}
                  label={value}
                  checked={country === value}
                />
              ))}
            </RadioGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCountryCancle} color='secondary'>
            취소
          </Button>
          <Button onClick={handleCountryClose} color='primary'>
            수정
          </Button>
        </DialogActions>
      </Dialog>

      {/* 언어 선택 */}
      <ButtonLabel onClick={handlelanguageOpen}>언어 선택</ButtonLabel>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={languageOpen}
        onClose={handleLanguageClose}
      >
        <DialogueTitle>사용 가능한 언어를 선택해주세요</DialogueTitle>
        <DialogContent>
          <form>
            <LanguageControl>
              <InputLabel>언어1</InputLabel>
              <Select
                value={language.language1}
                onChange={language1HandleChange}
                input={<SelectInput />}
              >
                <MenuItem value=' '>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </LanguageControl>
            <LanguageControl>
              <InputLabel>언어2</InputLabel>
              <Select
                value={language.language2}
                onChange={language2HandleChange}
                input={<SelectInput />}
              >
                <MenuItem value=' '>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </LanguageControl>
            <LanguageControl>
              <InputLabel>언어3</InputLabel>
              <Select
                value={language.language3}
                onChange={language3HandleChange}
                input={<SelectInput />}
              >
                <MenuItem value=' '>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </LanguageControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLanguageCancle} color='secondary'>
            취소
          </Button>
          <Button onClick={handleLanguageClose} color='primary'>
            수정
          </Button>
        </DialogActions>
      </Dialog>

      {/* 자기소개 수정 */}
      <Label>자기소개 수정</Label>
      <DescriptionField {...description} variant='outlined' multiline />

      {/* 지역 수정 */}
      <Label>활동지역 수정</Label>
      <Input
        type='address'
        width='100%'
        borderRadius='0.25rem'
        border='1px solid rgba(0,0,0,0.41)'
        textAlign='left'
        value={place.name ? `${place.formatted_address}(${place.name})` : ''}
        onClick={handlePlaceOpen}
        onChange={handlePlaceOpen}
      />
      <StyledModal open={placeOpen} onClose={handlePlaceClose}>
        <Fade in={placeOpen}>
          <div className='searchForm'>
            <SearchPlace setPlace={setPlace} />
          </div>
        </Fade>
      </StyledModal>
      <UpdateButton type='button' onClick={onSubmitHandler}>
        정보수정
      </UpdateButton>
    </div>
  );
}
