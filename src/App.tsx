import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--BackgroundComponentColor)",
          height: "100%",
          width: "100%",
          maxWidth: "1200px",
          maxHeight: "1500px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
