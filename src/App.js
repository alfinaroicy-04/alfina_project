import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes ,Route} from "react-router-dom";
import Home from "./Pages/Home.tsx";
import MovieList from "./Pages/Movielist.tsx";
import MovieDetails from "./Pages/Moviedetails.tsx";
import Toprated from "./Pages/Toprated.jsx";
import Actordetails from "./Pages/Actordetails.tsx";
import { ThemeProvider } from "./Context/ThemeContext.tsx";
import "./index.css";
function App({ Component, pageProps }) {
  return (
    
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
      <ThemeProvider>
        <Navbar />
        <Routes>
        <Component {...pageProps} />
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<MovieList/>}/>
          <Route path="/movie/:id" element={<MovieDetails/>}/>
          <Route path="/actor/:id" element={<Actordetails/>}/>
          <Route path="/top-rated" element={<Toprated/>}/>
        </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;