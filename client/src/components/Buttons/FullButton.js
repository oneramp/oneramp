import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : "#628798")};
  background-color: ${(props) => (props.border ? "transparent" : "#fff")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#707070" : "#364d57")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#364d57")};
    border: 1px solid #628798;
    color: ${(props) => (props.border ? "#7620ff" : "#fff")};
  }
`;
