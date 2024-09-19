import axios from "axios";
import { cnpj } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import "ldrs/tailspin";
import { tailspin } from "ldrs";
import { useContextHook } from "../context/PageContext";

function Acesso() {
  const [inputCnpj, setInputCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    setEmpresa,
    setAtualizarContratos,
    AtualizarContratos,
    SetContratosEmpresa,
  } = useContextHook();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(inputCnpj);
  // }, [inputCnpj]);
  useEffect(() => {
    SetContratosEmpresa([]);
  }, []);

  const handleAcessarCnpj = async () => {
    setIsLoading(true);
    /*Verificando se cnpj é válido */
    //const num = cnpj.generate();
    //console.log(num);
    if (!cnpj.isValid(inputCnpj) || inputCnpj.length != 14) {
      alert("cnpj incorreto");
      setIsLoading(false);
      return;
    }

    await axios
      .get(`${import.meta.env.VITE_BASE_URL}login/${inputCnpj}`)
      .then((response) => {
        setEmpresa(response.data);
        setAtualizarContratos(AtualizarContratos + 1);
        navigate("/Contratos");
      })
      .catch(() => {
        alert("CNPJ não encontrado");
      });
    setIsLoading(false);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
        padding: "70px",
        boxShadow: "0px 0px 20px var(--gray)",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "500px",
        height: "100%",
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
            PAGAMENTO DE FORNECEDOR
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="InputCnpj">CNPJ</label>

            {/*Mascara do input para cnpj*/}
            <InputMask
              mask="99.999.999/9999-99"
              id="InputCnpj"
              onChange={(e) => {
                const InputComCaracteresEspeciais = e.target.value;
                const InputLimpo = InputComCaracteresEspeciais.replace(
                  /\D/g,
                  ""
                );
                setInputCnpj(InputLimpo);
              }}
              style={{
                width: "300px",
                height: "30px",
                padding: "10px",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              style={{
                backgroundColor: "var(--verdebtn)",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
                height: "30px",
              }}
              onClick={handleAcessarCnpj}
            >
              Acessar
            </button>
            <p style={{ fontSize: "10px" }}>ou</p>
            <p
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "var(--verdebtn)",
                fontWeight: "500",
              }}
              onClick={() => {
                navigate("/CadastroEmpresa");
              }}
            >
              Criar Conta
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Acesso;
