import axios from "axios";
import React, { useState } from "react";
import { useContextHook } from "../context/PageContext";

function CriarContrato() {
  const [isLoading, setIsLoading] = useState(false);
  const [nome_do_contrato, setNome_do_contrato] = useState("");
  const [codigo_contrato, setCodigo_contrato] = useState("");
  const [retencao_tecnica, setRetencao_tecnica] = useState(0);
  const { empresa, setAtualizarContratos, AtualizarContratos } =
    useContextHook();

  const handleCriarContrato = async () => {
    if (!nome_do_contrato || !codigo_contrato || !retencao_tecnica) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    const contrato = {
      nome_do_contrato,
      codigo_contrato,
      retencao_tecnica,
      empresaId: empresa?.id,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}contrato`,
        contrato
      );

      if (response.status === 201) {
        setAtualizarContratos(AtualizarContratos + 1);
      }
    } catch (error) {
      alert("Erro ao criar contrato");
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--gray)",
        display: "flex",
        color: "white",
        justifyContent: "space-between",
        fontSize: "12px",
        padding: "5px",
        height: "40px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        style={{
          width: "100%",
          maxWidth: "600px",
          color: "black",
          textAlign: "center",
        }}
        placeholder="insira o Titulo do Contrato"
        onChange={(e) => {
          setNome_do_contrato(e.target.value);
        }}
      />
      <input
        type="text"
        style={{
          width: "100%",
          maxWidth: "200px",
          color: "black",
          textAlign: "center",
        }}
        placeholder="Insira o código do contrato"
        onChange={(e) => {
          setCodigo_contrato(e.target.value);
        }}
      />
      <input
        type="number"
        style={{
          width: "100%",
          maxWidth: "100px",
          color: "black",
          textAlign: "center",
        }}
        onChange={(e) => {
          setRetencao_tecnica(Number(e.target.value));
        }}
        placeholder="%"
      />
      <button
        type="submit"
        style={{
          fontSize: "8px",
          height: "23px",
          backgroundColor: "var(--verdebtn)",
          border: "none",
          cursor: "pointer",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          gap: "10px",
        }}
        onClick={handleCriarContrato}
      >
        Criar Contrato
        {isLoading && (
          <l-tailspin
            size="10"
            stroke="1"
            speed="0.9"
            color="var(--blue)"
          ></l-tailspin>
        )}
      </button>
    </div>
  );
}

export default CriarContrato;
