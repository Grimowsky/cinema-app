import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";

function App() {
  const test = "123";
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
    </Routes>
  );
}

function Test() {
  const test = "123";

  return test;
}

export default App;
