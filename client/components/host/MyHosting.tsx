import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Host } from '../../interfaces';

interface Props {
  host: Host;
}

const Label = styled.p`
  margin: 2em 0 0.5em 0;
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
export default function MyHosting({ host }: Props): ReactElement {
  const [isOn, setIsOn] = React.useState(host[0].on);
  const [country, setCountry] = React.useState(host[0].country);
  const [language, setLanguage] = React.useState({
    language1: host[0].language1,
    language2: host[0].language2,
    language3: host[0].language3,
  });
  const [languageSave, setLanguageSave] = React.useState(language);
  const [languageOpen, setLanguageOpen] = React.useState(false);

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
  const languages = [
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

  const handleLanguageOpen = () => {
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

  const language1HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage({
      language1: event.target.value,
      language2: language.language2,
      language3: language.language3,
    });
  };
  const language2HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage({
      language1: language.language1,
      language2: event.target.value,
      language3: language.language3,
    });
    console.log(language);
  };
  const language3HandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage({
      language1: language.language1,
      language2: language.language2,
      language3: event.target.value,
    });
    console.log(language);
  };

  const isOnHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isOn === 0) setIsOn(1);
    else setIsOn(0);
  };
  const countryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <h3>마이 호스팅</h3>
      {/* 호스트 설정 */}
      <Label>호스트 활성</Label>
      <SwitchForm
        control={<IsOn onChange={isOnHandleChange} color='primary' />}
        label=''
      />
      {/* 국가 선택 */}
      <Label>국가 선택</Label>
      <RadioGroup value={country} onChange={countryHandleChange}>
        {countries.map((value) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={value}
            checked={country === value}
          />
        ))}
      </RadioGroup>
      {/* 언어 선택 */}
      <Label onClick={handleLanguageOpen}>언어 선택</Label>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={languageOpen}
        onClose={handleLanguageClose}
      >
        <DialogTitle>사용 가능한 언어를 선택해주세요</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <InputLabel>언어1</InputLabel>
              <Select
                value={language.language1}
                onChange={language1HandleChange}
                input={<Input />}
              >
                <MenuItem value=''>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>언어2</InputLabel>
              <Select
                value={language.language2}
                onChange={language2HandleChange}
                input={<Input />}
              >
                <MenuItem value=''>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>언어3</InputLabel>
              <Select
                value={language.language3}
                onChange={language3HandleChange}
                input={<Input />}
              >
                <MenuItem value=''>
                  <em>선택안함</em>
                </MenuItem>
                {languages.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLanguageCancle} color='primary'>
            취소
          </Button>
          <Button onClick={handleLanguageClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
