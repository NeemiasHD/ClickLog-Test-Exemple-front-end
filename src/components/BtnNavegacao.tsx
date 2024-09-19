import React from "react";
interface BtnNavObjetos {
  nomeBtn: string;
  color: string;
  onClick?: () => void; // Adiciona a propriedade onClick
}

const BtnNavegacao: React.FC<BtnNavObjetos> = ({ color, nomeBtn, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: color,
        color: "white",
        maxWidth: "300px",
        border: "none",
        cursor: "pointer",

        fontSize: "20px",
        width: "100%",
      }}
      onClick={onClick}
    >
      {nomeBtn}
    </button>
  );
};

export default BtnNavegacao;
