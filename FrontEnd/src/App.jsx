import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Home from './pages/Home/index.jsx';
import ProductListing from './pages/ProductListing/index.jsx';
import Footer from './pages/Footer/index.jsx';
import ProductDetails from './pages/ProductDetails/index.jsx';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx'

import Drawer from '@mui/material/Drawer';
import { createContext, useState } from 'react';
import CartPanel from './components/CartPanel/index.jsx';

export const MyContext = createContext();

export default function App() {


  const [openCartPanel, setOpenCartPanel] = useState(false);
  
  const toggleCartPanel = (newOpen) => () => {
      setOpenCartPanel(newOpen);
  };

  const values = {
    setOpenCartPanel,
  }


  return (
    <>
    <BrowserRouter>
    <MyContext.Provider value={values}>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/productListing" exact={true} element={<ProductListing />} />
        <Route path={"/product/:id"} exact={true} element={<ProductDetails/>} />
        <Route path={"/login"} exact={true} element={<Login/>} />
        <Route path={"/register"} exact={true} element={<Register/>} />
      </Routes>
      <Footer />
      <Drawer open={openCartPanel} onClose={toggleCartPanel(false)} anchor={"right"} className='cartPanel'>
      <CartPanel/>
      </Drawer>
    </MyContext.Provider>
    </BrowserRouter>

    </>
  );
}
