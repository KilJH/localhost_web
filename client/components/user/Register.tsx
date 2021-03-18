import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useState } from "react";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";

const GenderButton = styled.button`
  height: 100%;
  padding: 1rem 0;
  background-color: transparent;
  border-color: transparent;
  border-radius: 0.25rem;
  width: 100%;
  outline: 0;
  &:hover {
    box-shadow: none;
    background-color: rgba(81, 151, 213, 0.3);
  }
  &:active {
    box-shadow: none;
    border-color: transparent;
    background-color: rgba(81, 151, 213, 0.6);
  }
  &.selected {
    border-color: transparent;
    background-color: #5197d5;
    box-shadow: none;
  }
  &.MuiButtonGroup-groupedOutlinedPrimary:hover {
    border-color: transparent;
  }
  & > button {
    height: 100%;
    margin: 0;
    padding: 1rem 0;
  }
`;

const RegisterButton = styled.button`
  margin-top: 3rem;
  color: black;
  background-color: #5197d5;
  width: 100%;
  height: 2.3rem;
  box-shadow: none;
  border-color: transparent;
  border-radius: 0.25rem;
  outline: 0;
  &:hover {
    box-shadow: none;
    border-color: transparent;
    background-color: rgba(81, 151, 213, 0.8);
  }
  &:active {
    box-shadow: none;
    border-color: transparent;
    background-color: #5197d5;
  }
`;

const CssTextField = withStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: 0,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "rgb(81, 151, 213)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(81, 151, 213)",
      },
    },
  },
})(TextField);

const CssButtonGroup = withStyles({
  root: {
    display: "flex",
    marginLeft: "1rem",
    marginTop: "1rem",
  },
})(ButtonGroup);

export default function Register() {
  const speCharReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i;
  const numReg = /[^0-9]/;

  const [isMan, setIsMan] = useState(true);

  const passwordInput = useInput("");
  const nicknameInput = useInput(
    "",
    (value: string) => !speCharReg.test(value)
  );
  const addressInput = useInput("");
  const emailInput = useInput("");
  const nameInput = useInput(
    "",
    (value: string) => !(speCharReg.test(value) || numReg.test(value))
  );
  const phoneNumInput = useInput(
    "",
    (value: string) => !numReg.test(value) && value.length <= 12
  );

  const onClickHandler = (value: boolean) => {
    setIsMan(value);
  };

  // 순서 v
  // useInput v
  // 유효성검사 v
  return (
    <Container maxWidth="sm">
      <Grid container justify="flex-start" direction="row" alignItems="center">
        <Grid item xs={12}>
          <h3 style={{ marginTop: "1rem" }}>
            회원가입을 위해 개인정보를 입력해주세요.
          </h3>
          <h5>LocalHost는 고객님의 소중한 정보를 안전하게 관리합니다.</h5>
        </Grid>
        <CssTextField
          {...emailInput}
          label="이메일을 입력하세요."
          variant="outlined"
          type="email"
        />
        <CssTextField
          {...passwordInput}
          label="비밀번호를 입력하세요."
          variant="outlined"
          type="password"
          margin-bottom="15px"
        />
        <h6 style={{ marginTop: ".5rem" }}>
          비밀번호는 8~16자리의 영문 대/소문자, 숫자, 특수문자 중 2개이상을
          조합해서 비밀번호를 설정해 주세요.
        </h6>
        <Grid item xs={9}>
          <CssTextField
            label="이름을 입력하세요."
            variant="outlined"
            type="text"
            {...nameInput}
          />
        </Grid>
        <Grid item xs={3}>
          <CssButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            disableRipple
          >
            <GenderButton
              color="primary"
              className={isMan ? "selected" : ""}
              onClick={() => onClickHandler(true)}
            >
              남
            </GenderButton>
            <GenderButton
              color="primary"
              className={isMan ? "" : "selected"}
              onClick={() => onClickHandler(false)}
            >
              여
            </GenderButton>
          </CssButtonGroup>
        </Grid>
        <CssTextField
          {...nicknameInput}
          label="사용할 닉네임을 입력하세요."
          variant="outlined"
          type="text"
        />
        <CssTextField
          {...phoneNumInput}
          label="휴대폰 번호를 입력하세요."
          variant="outlined"
        />
        <CssTextField
          {...addressInput}
          label="주소를 입력하세요."
          variant="outlined"
          type="text"
        />
        <RegisterButton>회원가입</RegisterButton>
      </Grid>
    </Container>
  );
}
