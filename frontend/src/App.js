import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontpage from "./stranice/Frontpage";
import Library from "./stranice/Library";
import Search from "./stranice/Search";
import Login from "./stranice/Login";
import Register from "./stranice/Register";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/frontpage" element={<Frontpage/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
