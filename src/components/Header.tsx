import { cnpj } from "cpf-cnpj-validator";
import React from "react";
interface headerObjetos {
  nomeSecao: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj_header: string;
}

const Header: React.FC<headerObjetos> = ({
  razao_social,
  nome_fantasia,
  cnpj_header,
  nomeSecao,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--blue)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="./src/img/logo.png" width={150} />
        </div>
        <h1 style={{ width: "500px", fontSize: "30px", fontWeight: "400" }}>
          PAGAMENTO DE FORNECEDOR
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid red",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <div>
          <p>Razão Social: {razao_social}</p>
          <p>Nome Fantasia: {nome_fantasia}</p>
        </div>
        <div>
          <p>CNPJ: {cnpj.format(cnpj_header)}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid red",
          borderRadius: "10px",
        }}
      >
        <p>{nomeSecao}</p>
      </div>
    </div>
  );
};

export default Header;
