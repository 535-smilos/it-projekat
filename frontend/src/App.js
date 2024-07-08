import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Frontpage from "./stranice/Frontpage";
import Library from "./stranice/Library";
import Search from "./stranice/Search";
import Login from "./stranice/Login";
import Register from "./stranice/Register";
import Admin from "./stranice/Admin";
import { AudioPlayerProvider } from "./context/audioContext";
import "./App.css";
import AudioPlayer from "./komponente/AudioPlayer";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <AudioPlayerProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
      </AudioPlayerProvider>
    </div>
  );
}

const AppRoutes=()=>{
  const location = useLocation();
  const noAudioPlayerPaths = ['/login', '/register', '/admin'];

 
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);


  return (
    <>
    <Routes>
      
        <Route path="/frontpage" element={<Frontpage/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin" element={<Admin/>}/>
    </Routes>
      {!noAudioPlayerPaths.includes(location.pathname) && <AudioPlayer />}
    </>
  );
};


export default App;
