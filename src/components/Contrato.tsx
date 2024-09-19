import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContextHook } from "../context/PageContext";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

interface contratoObjetos {
  nome_do_contrato: string;
  codigo_contrato: string;
  retencao_tecnica: number;
  id: number;
}

const Contrato: React.FC<contratoObjetos> = ({
  nome_do_contrato,
  codigo_contrato,
  retencao_tecnica,
  id,
}) => {
  const {
    SetContratoSelecionado,
    ContratoSelecionado,
    setAtualizarContratos,
    AtualizarContratos,
  } = useContextHook();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    ContratoSelecionado == id ? setIsChecked(true) : setIsChecked(false);
  }, [ContratoSelecionado]);
  const handleExcluirContrato = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}contrato/${id}`
      );

      if (response.status === 201) {
        setAtualizarContratos(AtualizarContratos + 1);
      }
    } catch (error) {
      alert("Erro ao criar contrato");
      console.log(error);
    }
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
        type="checkbox"
        name=""
        id=""
        checked={isChecked}
        style={{
          transform: "scale(1.5)", // Aumenta o checkbox
          margin: "10px",
          cursor: "pointer",
        }}
        onChange={() => {
          if (ContratoSelecionado == id) {
            SetContratoSelecionado(0);
          } else {
            SetContratoSelecionado(id);
          }
          setIsChecked(!isChecked);
        }}
      />

      <p style={{ width: "100%", maxWidth: "500px", color: "black" }}>
        {nome_do_contrato}
      </p>
      <p
        style={{
          width: "100%",
          maxWidth: "120px",
          textAlign: "center",
          color: "black",
        }}
      >
        {codigo_contrato}
      </p>
      <p
        style={{
          width: "100%",
          maxWidth: "120px",
          textAlign: "center",
          backgroundColor: "var(--blue)",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {retencao_tecnica}%
      </p>
      <p
        style={{
          width: "100%",
          maxWidth: "65px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--blue)",
            height: "30px",
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            alert("lupa");
          }}
        >
          <FaMagnifyingGlass />
        </div>
        <div
          style={{
            backgroundColor: "red",
            height: "30px",
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleExcluirContrato}
        >
          <BiTrash />
        </div>
      </p>
    </div>
  );
};

export default Contrato;
