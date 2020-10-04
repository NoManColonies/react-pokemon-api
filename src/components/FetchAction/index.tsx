import React from "react";
import Style, { StyledComponentBase } from "styled-components";
import IFetchAction from "./IFetchAction";

const Button: String &
  StyledComponentBase<"button", any, {}, never> = Style.button``;

function FetchAction({ onClick, children }: IFetchAction): JSX.Element {
  return (
    <Button type="button" onClick={onClick}>
      {children}
    </Button>
  );
}

export default FetchAction;
