import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Home from './pages/Home/index.jsx';
import ProductListing from './pages/ProductListing/index.jsx';
import Footer from './pages/Footer/index.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/productListing" exact={true} element={<ProductListing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
