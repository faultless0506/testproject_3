import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization/Authorization";
import Gallery from "./pages/Gallery/Gallery";
import "./styles/index.scss";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Authorization />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
