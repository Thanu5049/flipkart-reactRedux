import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { NavBar } from './E-Commerce/pages/NavBar';
import { Footer } from './E-Commerce/pages/Footer';
import { CardDisplay } from './E-Commerce/pages/CardDisplay';
import { Login } from './E-Commerce/pages/Login';
import Cart from './E-Commerce/pages/Cart';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CartDetails from './E-Commerce/pages/CartDetails'
import ThankyouPage from './E-Commerce/pages/ThankyouPage';
import { useState } from 'react';
import FilteredDataPage from './E-Commerce/pages/FilteredDataPage';

function App() {
  const [order,setOrder]=useState(null);
  return (
    <div>
   <Router>
   <NavBar />
        <Routes>
          <Route path="/" element={<CardDisplay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-details" element={<CartDetails setOrder={setOrder}/>}  />
          <Route path="/order-confirmation" element={<ThankyouPage  order={order}/>}/>
          <Route path="/filtered-data" element={<FilteredDataPage />}/>
        </Routes>
      </Router>
      <Footer />
      </div>
  );
}

export default App;
library.add(fab, fas, far)
