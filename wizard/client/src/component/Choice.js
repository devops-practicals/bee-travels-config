import React from "react";

const Choice = ({ label, data, onChange, required }) => {
  return (
    <div className="ui raised segment">
      <div className="ui form">
        {required ? <h2 className="ui header">{label} <span class="required">*Required</span></h2> : <h2 className="ui header">{label}</h2> }
        <div className="inline fields">
          {data.map((v, i) => (
            <div className="field" key={i}>
              <div
                className="ui radio checkbox"
                onChange={e => onChange(e.target.value)}
              >
                <input
                  type="radio"
                  id={i}
                  name={label}
                  value={v.id || v.value}
                  disabled={v.disabled}
                />

                <label>
                  {v.value}
                  {v.disabled ? " (In Development)" : ""}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choice;
