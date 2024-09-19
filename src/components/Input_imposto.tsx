import React from "react";

interface ImpostoObjetos {
  label: string;
  setValor: React.Dispatch<React.SetStateAction<number>>;
}

const Input_imposto: React.FC<ImpostoObjetos> = ({ label, setValor }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <label>{label}</label>
      <input
        type="number"
        style={{ width: "100%" }}
        onChange={(e) => {
          setValor(Number(e.target.value));
        }}
      />
    </div>
  );
};

export default Input_imposto;
