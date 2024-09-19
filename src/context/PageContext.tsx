import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PageContextType {
  //dados armazenados no contexto
  empresa: empresatype | null;
  setEmpresa: React.Dispatch<React.SetStateAction<empresatype | null>>;
  ContratoSelecionado: number;
  SetContratoSelecionado: React.Dispatch<React.SetStateAction<number>>;
  dadosContratoSelecionado: dadosContratoSelecionado | null;
  SetdadosContratoSelecionado: React.Dispatch<
    React.SetStateAction<dadosContratoSelecionado | null>
  >;
  AtualizarContratos: number;
  setAtualizarContratos: React.Dispatch<React.SetStateAction<number>>;
  contratoEmpresa: contrato[]; // Array de contratos
  SetContratosEmpresa: React.Dispatch<React.SetStateAction<contrato[]>>;
}

// Cria o contexto
const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children: ReactNode;
}
type empresatype = {
  id: number;
  cnpj: string;
  razao_social: string;
  name_fantasia: string;
};
type dadosContratoSelecionado = {
  nome_do_contrato: string;
  codigo_contrato: string;
  retencao_tecnica: number;
  id: number;
  empresaId: number;
};
type contrato = {
  id: number;
  empresaId: string;
  retencao_tecnica: number;
  nome_do_contrato: string;
  codigo_contrato: string;
};

// Provedor do contexto
export const PageProvider = ({ children }: PageProviderProps) => {
  const [empresa, setEmpresa] = useState<empresatype | null>(null);
  const [ContratoSelecionado, SetContratoSelecionado] = useState(0);
  const [AtualizarContratos, setAtualizarContratos] = useState(0);
  const [dadosContratoSelecionado, SetdadosContratoSelecionado] =
    useState<dadosContratoSelecionado | null>(null); //buscando contrato selecionado
  const [contratoEmpresa, SetContratosEmpresa] = useState<contrato[]>([]); // Agora é um array de contratos

  useEffect(() => {
    if (ContratoSelecionado == 0) {
      SetdadosContratoSelecionado(null);
    } else {
      const buscarContrato = async () => {
        await axios
          .get(
            `${import.meta.env.VITE_BASE_URL}contrato/${ContratoSelecionado}`
          )
          .then((response) => {
            SetdadosContratoSelecionado(response.data);
            console.log(response.data);
          })
          .catch(() => {
            alert("contrato não encontradoo");
          });
      };
      buscarContrato();
    }
  }, [ContratoSelecionado]);

  useEffect(() => {
    const carregarContratos = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}contratos/${empresa?.id}`)
        .then((response) => {
          SetContratosEmpresa(response.data);
          console.log(response.data);
        })
        .catch(() => {});
    };
    carregarContratos();
  }, [AtualizarContratos]);

  return (
    <PageContext.Provider
      value={{
        empresa,
        setEmpresa,
        ContratoSelecionado,
        SetContratoSelecionado,
        SetdadosContratoSelecionado,
        dadosContratoSelecionado,
        AtualizarContratos,
        setAtualizarContratos,
        contratoEmpresa,
        SetContratosEmpresa,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const useContextHook = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
