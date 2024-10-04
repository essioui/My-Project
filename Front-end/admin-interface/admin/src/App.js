import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import MyForm from "./components/MyForm";
import Commands from "./components/Commands";
import Products from "./components/Products";
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/MyForm" element={ <MyForm />} />
        <Route path="/Commands" element={ <Commands />} />
        <Route path="/Products" element={ <Products />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
