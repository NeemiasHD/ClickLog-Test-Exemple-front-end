import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import { cnpj } from "cpf-cnpj-validator";

function CadastroEmpresa() {
  const navigate = useNavigate();
  const [CNPJ, Setcnpj] = useState("");
  const [razao_social, Setrazao_social] = useState("");
  const [name_fantasia, Setname_fantasia] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const HandleCriarEmpresa = async () => {
    /*Metodo de criar empresa */
    if (!cnpj.isValid(CNPJ)) {
      alert("cnpj incorreto");
      return;
    }
    if (!cnpj || !razao_social || !name_fantasia) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    const empresa = {
      cnpj: CNPJ,
      razao_social,
      name_fantasia,
    };

    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Requisição POST com axios
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}empresas`,
        empresa
      );

      // Se o cadastro for bem-sucedido
      if (response.status === 201) {
        alert("Empresa cadastrada com sucesso!");
        navigate("/"); // Redireciona para a página de contratos
      }
    } catch (error) {
      alert("Erro ao criar conta");
      console.log(error);
    }
    setIsLoading(false); // Ativa o estado de carregamento
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "70px",
        boxShadow: "0px 0px 20px var(--gray)",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "500px",
        height: "100%",
        gap: "10px",
      }}
    >
      {isLoading ? (
        <l-tailspin
          size="40"
          stroke="5"
          speed="0.9"
          color="var(--blue)"
        ></l-tailspin>
      ) : (
        <>
          <div
            style={{
              backgroundColor: "var(--blue)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="./src/img/logo.png" width={200} />
          </div>
          <h1
            style={{ fontSize: "21px", fontWeight: "500", textAlign: "center" }}
          >
            Cadastro Empresa
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <label style={{ color: "gray", fontSize: "10px" }}>CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              id="InputCnpj"
              style={{ maxWidth: "600px", width: "100%" }}
              onChange={(e) => {
                const InputComCaracteresEspeciais = e.target.value;
                const InputLimpo = InputComCaracteresEspeciais.replace(
                  /\D/g,
                  ""
                );
                Setcnpj(InputLimpo);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <label style={{ color: "gray", fontSize: "10px" }}>
              Razão Social
            </label>
            <input
              type="text"
              style={{ maxWidth: "600px", width: "100%" }}
              onChange={(e) => {
                Setrazao_social(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <label style={{ color: "gray", fontSize: "10px" }}>
              Nome Fantasia
            </label>
            <input
              type="text"
              style={{ maxWidth: "600px", width: "100%" }}
              onChange={(e) => {
                Setname_fantasia(e.target.value);
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "var(--blue)",
                color: "white",
                border: "none",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Voltar
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "var(--verdebtn)",
                color: "white",
                border: "none",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={HandleCriarEmpresa}
            >
              Cadastro Empresa
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CadastroEmpresa;
