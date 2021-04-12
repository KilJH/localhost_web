// import reset from "./reset.css";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    /* box-sizing: border-box; */
    }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    padding: .5rem;
    border: 1px solid #aaaaaa;
    border-radius: .25rem;
    outline: none;
    box-sizing: border-box;
    font-size: 0.8em;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  button{
    cursor: pointer;
  }
  button:hover{
    background-color: linear-gradient(#ffffff,#aaaaaa)
  }
  input:disabled{
    background-color: #e5e7e9;
  }

  @media only screen and (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 12px;
    }
  }
`;

export default GlobalStyle;
