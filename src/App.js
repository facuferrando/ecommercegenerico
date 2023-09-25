import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ItemListContainer } from './components/ItemListContainer';
import { NavBar } from './components/NavBar';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { CartProvider } from './contexts/CartContext';
import { Cart } from './components/Cart';


function App()  {
  return (
  <>
  <CartProvider>
  <BrowserRouter>
  <NavBar />
  <Routes >
    <Route path="/" element={<ItemListContainer />}/>
    <Route path="/category/:id" element={<ItemListContainer />}/>
    <Route path="/item/:id" element={<ItemDetailContainer  />}/>
    <Route path="/cart" element={<Cart/>}/>
  </Routes>
  </BrowserRouter>
  </CartProvider>
  </>
  )
};

export default App;
