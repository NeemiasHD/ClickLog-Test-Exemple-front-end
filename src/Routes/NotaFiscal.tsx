import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContextHook } from "../context/PageContext";
import BtnNavegacao from "../components/BtnNavegacao";
import { useNavigate } from "react-router-dom";
import Input_imposto from "../components/Input_imposto";
import { BiTrash } from "react-icons/bi";
import AnexarArquivo from "../components/AnexarArquivo";
import Input_dados_nota from "../components/Input_dados_nota";
import axios from "axios";

function NotaFiscal() {
  useEffect(() => {
    //volta para a home quando não há empresa logada
    !empresa?.cnpj && navigate("/");
  }, []);
  const { empresa, dadosContratoSelecionado } = useContextHook();
  const navigate = useNavigate();
  const [InputValor, setInputValor] = useState<number>(0);
  const [InputNumeroNota, setInputNumeroNota] = useState<number>(0);
  const [InputDataEmissao, setInputDataEmissao] = useState("");
  const [InputDataVencimento, setInputDataVencimento] = useState("");
  const [InputRetencaoDeImposto, setInputRetencaoDeImposto] = useState(false);
  const [InputRetencaoTecnica, setInputRetencaoTecnica] = useState(false);
  const [arquivosAnexados, setArquivosAnexados] = useState<File[]>([]);
  const [issqn, setIssqn] = useState<number>(0);
  const [irrf, setIrrf] = useState<number>(0);
  const [csll, setCsll] = useState<number>(0);
  const [cofins, setCofins] = useState<number>(0);
  const [inss, setInss] = useState<number>(0);
  const [pis, setPis] = useState<number>(0);

  const handleCriarNotaFiscal = async () => {
    //verificar se está faltando algum item
    const verificarCamposRetecaoImpostos = () => {
      let mensagem = "";

      if (issqn <= 0) {
        mensagem += "ISSQN deve ser maior que 0\n";
      }
      if (irrf <= 0) {
        mensagem += "IRRF deve ser maior que 0\n";
      }
      if (csll <= 0) {
        mensagem += "CSLL deve ser maior que 0\n";
      }
      if (cofins <= 0) {
        mensagem += "COFINS deve ser maior que 0\n";
      }
      if (inss <= 0) {
        mensagem += "INSS deve ser maior que 0\n";
      }
      if (pis <= 0) {
        mensagem += "PIS deve ser maior que 0\n";
      }

      if (mensagem) {
        alert(mensagem);
        return true;
      }
    };
    const verificarDadosNota = () => {
      let mensagem = "";

      if (InputDataEmissao == "") {
        mensagem += "Data de Emissao não preenchida\n";
      }
      if (InputDataVencimento == "") {
        mensagem += "Data de Vencimento não preenchida\n";
      }
      if (InputNumeroNota == 0) {
        mensagem += "Insira um numero da nota fiscal válido\n";
      }
      if (InputValor == 0) {
        mensagem += "o Valor deve ser maior que 0\n";
      }

      if (mensagem) {
        alert(mensagem);
      }
      if (mensagem) {
        return true;
      }
    };
    if (verificarDadosNota()) {
      return;
    }

    if (InputRetencaoDeImposto) {
      if (verificarCamposRetecaoImpostos()) {
        return;
      }
    }

    const formData = new FormData();
    // Anexando os arquivos ao FormData
    arquivosAnexados.forEach((file, index) => {
      formData.append("arquivos", file);
    });

    // Adiciona outros campos no FormData como JSON
    formData.append(
      "dados",
      JSON.stringify({
        numero_nota: InputNumeroNota,
        data_de_emissao: InputDataEmissao,
        data_de_vencimento: InputDataVencimento,
        valor: InputValor,
        retencao_de_impostos: InputRetencaoDeImposto,
        issqn,
        irrf,
        csll,
        cofins,
        inss,
        pis,
        retencao_tecnica: InputRetencaoTecnica,
        valor_retencao_tecnica: InputRetencaoTecnica
          ? (InputValor / 100) *
            (dadosContratoSelecionado?.retencao_tecnica || 0)
          : null,
        porcentagem_retencao_tecnica:
          dadosContratoSelecionado?.retencao_tecnica || 0,
        contrato_id: dadosContratoSelecionado?.id,
      })
    );

    try {
      // Requisição POST com axios
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}CriarNotaFiscal`,
        formData
      );

      // Verifica se a requisição foi bem-sucedida
      if (response.status === 201) {
        console.log(
          `Solicitação #${response.data.notaFiscal.id} foi enviada com sucesso.`
        );
        console.log(response.data);
        alert(
          `Solicitação #${response.data.notaFiscal.id} foi enviada com sucesso.`
        );
        navigate("/"); // Redireciona para a página principal
      }
    } catch (error) {
      console.error("Erro ao enviar nota fiscal:", error);
      alert("Erro ao enviar nota fiscal");
    }
  };

  return (
    <div /*Reutilizavel */
      style={{
        backgroundColor: "white",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        width: "100%",
        maxWidth: "90%",
        transform: "scale(.64)",
      }}
    >
      {empresa != null && (
        <Header
          nomeSecao="Dados da Nota Fiscal"
          razao_social={empresa?.razao_social}
          nome_fantasia={empresa?.name_fantasia}
          cnpj_header={empresa?.cnpj}
        />
      )}

      {/*Main */}

      <main
        style={{
          border: "1px solid red",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "10px",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <span style={{ fontWeight: "600" }}>Código Contrato: </span>
            {dadosContratoSelecionado?.codigo_contrato}
          </div>
          <p>{dadosContratoSelecionado?.nome_do_contrato}</p>
        </div>

        {/*input nota */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
          }}
        >
          {/*input nota */}

          <Input_dados_nota
            label="Número da Nota"
            setInputValorNumero={setInputNumeroNota}
            tipo="number"
          />
          <Input_dados_nota
            label="Data de Emissão"
            setInputValorString={setInputDataEmissao}
            tipo="date"
          />
          <Input_dados_nota
            label="Data de Vencimento"
            setInputValorString={setInputDataVencimento}
            tipo="date"
          />
          <Input_dados_nota
            label="Valor"
            placeholder="R$"
            setInputValorNumero={setInputValor}
            tipo="number"
          />
        </div>

        <div>
          <input
            type="checkbox"
            onChange={() => {
              setInputRetencaoDeImposto(!InputRetencaoDeImposto);
            }}
          />{" "}
          Retenção de Impostos
        </div>
        {/*dados inpostos */}
        <div
          style={{
            display: "flex",
            border: "1px solid red",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "20px",
            gap: "10px",
          }}
        >
          <label
            style={{
              position: "absolute",
              left: "10px",
              backgroundColor: "white",
              top: "-22px",
              padding: "10px",
            }}
          >
            Dados
          </label>
          <Input_imposto label="ISSQN" setValor={setIssqn} />
          <Input_imposto label="IRRF" setValor={setIrrf} />
          <Input_imposto label="CSLL" setValor={setCsll} />
          <Input_imposto label="COFINS" setValor={setCofins} />
          <Input_imposto label="INSS" setValor={setInss} />
          <Input_imposto label="PIS" setValor={setPis} />
        </div>

        {/*dados Retencao técnica */}
        <div>
          <input
            type="checkbox"
            onChange={() => {
              setInputRetencaoTecnica(!InputRetencaoTecnica);
            }}
          />{" "}
          Retenção Técnica
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid red",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "20px",
            gap: "10px",
          }}
        >
          <label
            style={{
              position: "absolute",
              left: "10px",
              backgroundColor: "white",
              top: "-22px",
              padding: "10px",
            }}
          >
            Dados
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label>Valor</label>
            <div style={{ backgroundColor: "var(--gray)" }}>
              <p style={{ marginLeft: "10px" }}>
                R${" "}
                {dadosContratoSelecionado
                  ? (
                      (InputValor / 100) *
                      dadosContratoSelecionado?.retencao_tecnica
                    ).toFixed(2)
                  : 0}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label>Percentual</label>
            <div style={{ backgroundColor: "var(--gray)" }}>
              <p style={{ marginLeft: "10px" }}>
                {dadosContratoSelecionado?.retencao_tecnica}
              </p>
            </div>
          </div>
        </div>
        {/*Anexar Arquivo*/}
        <AnexarArquivo
          arquivosAnexados={arquivosAnexados}
          setArquivosAnexados={setArquivosAnexados}
        />

        {/*Botoes navegacao */}
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
              navigate("/Contratos");
            }}
          />
          <BtnNavegacao
            nomeBtn="Proximo"
            color="var(--verdebtn)"
            onClick={handleCriarNotaFiscal}
          />
        </div>
      </main>

      {/*fimMain */}

      <Footer />
    </div>
  );
}

export default NotaFiscal;
