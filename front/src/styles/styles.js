import styled, { css } from 'styled-components'

const Button = styled.button`
  background: ${props => props.tiny ? "palevioletred" : "bisque"};
  color: ${props => props.tiny ? "white" : "black"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;

  /*
  toinen tapa lisätä props-kohtaisia, vaatii css-importin
  ${props => 
    props.tiny &&
    css`
        background: palevioletred;
        color: white;
    `
  }
  */
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

export { Button, Input, Page, Navigation }