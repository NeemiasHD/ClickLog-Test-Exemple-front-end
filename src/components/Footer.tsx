import React from "react";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--blue)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="./src/img/logo.png" width={100} />
      </div>
      <p
        style={{
          color: "gray",
          width: "100%",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        &copy; 2022-2022 Construindo Patrimonios
      </p>
    </div>
  );
}

export default Footer;
