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
import Cart from './pages/Cart/index.jsx';
import CheckOut from './pages/CheckOut/index.jsx';
import MyAccount from './pages/MyAccount/index.jsx';
import Orders from './pages/Orders/index.jsx';

export const MyContext = createContext();

export const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);


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
      
      <Routes>
        <Route path="/" exact={true} element={<MainLayout><Home /></MainLayout>} />
        <Route path={"/product/:id"} exact={true} element={<MainLayout><ProductDetails/></MainLayout>} />
        <Route path={"/login"} exact={true} element={<Login/>} />
        <Route path={"/register"} exact={true} element={<Register/>} />
        <Route path={"/cart"} exact={true} element={<MainLayout><Cart/></MainLayout>} />
        <Route path={"/checkout"} exact={true} element={<MainLayout><CheckOut/></MainLayout>} />
        <Route path={"/my-account"} exact={true} element={<MainLayout><MyAccount/></MainLayout>} />
        <Route path={"/my-orders"} exact={true} element={<MainLayout><Orders/></MainLayout>} />
        <Route path="/listing" exact={true} element={<MainLayout><ProductListing /></MainLayout>} />
        <Route path="/listing/:category" exact={true} element={<MainLayout><ProductListing /></MainLayout>} />
        <Route path="/listing/:category/:subcategory" element={<MainLayout><ProductListing /></MainLayout>} />
      </Routes>
      
      <Drawer open={openCartPanel} onClose={toggleCartPanel(false)} anchor={"right"} className='cartPanel'>
      <CartPanel/>
      </Drawer>
    </MyContext.Provider>
    </BrowserRouter>

    </>
  );
}
