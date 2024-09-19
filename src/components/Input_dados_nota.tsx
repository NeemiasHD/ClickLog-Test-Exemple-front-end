interface InputDadosNotaProps {
  label: string;
  placeholder?: string;
  tipo: string;
  setInputValorNumero?: (value: number) => void;
  setInputValorString?: (value: string) => void;
}

function Input_dados_nota({
  label,
  placeholder = "", // Valor padrão para placeholder
  tipo,
  setInputValorNumero,
  setInputValorString,
}: InputDadosNotaProps) {
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
        placeholder={placeholder}
        type={tipo}
        style={{
          height: "30px",
          width: "100%",
          maxWidth: "300px",
          padding: "10px",
          display: "flex",
        }}
        onChange={(e) => {
          if (tipo === "number") {
            setInputValorNumero && setInputValorNumero(Number(e.target.value));
          } else {
            setInputValorString && setInputValorString(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default Input_dados_nota;
