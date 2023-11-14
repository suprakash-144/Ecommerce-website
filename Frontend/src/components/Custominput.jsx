import React from "react";

function Custominput(props) {
  const { type, name, placeholder, classname, value, onChange, onBlur } = props;
  return (
    <div className="coustuminput py-2 ">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Custominput;
