import "../sharedComponents.css";

import React from "react";

function Input(props) {
  return <input className="input__box" type={props.type} placeholder={props.placeholder} />;
}

export default Input;
