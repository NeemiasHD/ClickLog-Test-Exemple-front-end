import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContextHook } from "../context/PageContext";
import { cnpj } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import axios from "axios";
import Contrato from "../components/Contrato";
import { useNavigate } from "react-router-dom";
import BtnNavegacao from "../components/BtnNavegacao";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CriarContrato from "../components/CriarContrato";

function Contratos() {
  const { empresa, ContratoSelecionado, contratoEmpresa } = useContextHook();

  const navigate = useNavigate();
  useEffect(() => {
    //volta para a home quando não há empresa logada
    !empresa?.cnpj && navigate("/");
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        width: "100%",
        maxWidth: "90%",
      }}
    >
      {empresa != null /*Garantindo que a empresa não é null */ && (
        <Header
          nomeSecao="Contratos Vinculados"
          razao_social={empresa?.razao_social}
          nome_fantasia={empresa?.name_fantasia}
          cnpj_header={empresa?.cnpj}
        />
      )}
      <div
        style={{
          backgroundColor: "gray",
          display: "flex",
          color: "white",
          justifyContent: "space-between",
          fontSize: "12px",
          padding: "5px",
          height: "40px",
          alignItems: "center",
        }}
      >
        <p style={{ width: "100%", maxWidth: "500px" }}>Nome do Contrato</p>
        <p
          style={{
            width: "100%",
            maxWidth: "120px",
            textAlign: "center",
          }}
        >
          Código do Contrato
        </p>
        <p
          style={{
            width: "100%",
            maxWidth: "120px",
            textAlign: "center",
          }}
        >
          Retenção Tecnica
        </p>
        <p
          style={{
            width: "100%",
            maxWidth: "55px",
            textAlign: "center",
          }}
        >
          Detalhes
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "scroll",
          height: "300px",
          maxHeight: "",
        }}
      >
        {/*Componente de criar contrato */}
        <CriarContrato />

        {/*Renderiza contratos caso exista algum */}
        {contratoEmpresa.length ? (
          /*Contratos*/
          contratoEmpresa.map((contrato) => (
            <Contrato
              nome_do_contrato={contrato.nome_do_contrato}
              codigo_contrato={contrato.codigo_contrato}
              retencao_tecnica={contrato.retencao_tecnica}
              id={contrato.id}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <p>A empresa não possui nenhum contrato</p>
          </div>
        )}
      </div>

      {/*Botoes anterior e proximo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "10px",
        }}
      >
        <BtnNavegacao
          nomeBtn="Anterior"
          color="#ffcc00"
          onClick={() => {
            navigate("/");
          }}
        />
        <BtnNavegacao
          nomeBtn="Proximo"
          color="var(--verdebtn)"
          onClick={() => {
            ContratoSelecionado
              ? navigate("/NotaFiscal")
              : alert("nenhum contrato Selecionado");
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Contratos;
