import React from "react";
import { BiTrash } from "react-icons/bi";

interface AnexarArquivoProps {
  arquivosAnexados: File[];
  setArquivosAnexados: React.Dispatch<React.SetStateAction<File[]>>;
}

function AnexarArquivo({
  arquivosAnexados,
  setArquivosAnexados,
}: AnexarArquivoProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <input
        type="file"
        id="InputArquivo"
        style={{ display: "none" }}
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          setArquivosAnexados((prevArquivos) => [...prevArquivos, ...files]);
          console.log(arquivosAnexados);
        }}
      />
      <label
        htmlFor="InputArquivo"
        style={{
          backgroundColor: "gray",
          color: "white",
          width: "200px",
          textAlign: "center",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        Anexar Nota Fiscal
      </label>

      {/* Display de arquivos anexados */}
      <div
        style={
          arquivosAnexados.length > 0
            ? {
                width: "300px",
                height: "40px",
                overflowY: "scroll",
                gap: "5px",
                display: "flex",
                flexDirection: "column",
              }
            : {
                height: "40px",
              }
        }
      >
        {arquivosAnexados.length > 0
          ? arquivosAnexados.map((file, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={() =>
                    setArquivosAnexados((prevArquivos) =>
                      prevArquivos.filter((_, i) => i !== index)
                    )
                  }
                  style={{
                    backgroundColor: "red",
                    height: "20px",
                    width: "20px",
                    color: "white",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <BiTrash size={20} />
                </p>
                {file.name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AnexarArquivo;
