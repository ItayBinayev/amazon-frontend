import './App.css';
import HomePage from './Pages/homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar/navbar';
import { SignInPage } from './Pages/SignInPage/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUpPage } from './Pages/SignUpPage/SignUpPage';
import CartPage from './Pages/CartPage/CartPage.js';
import ShippingAddressPage from './Pages/ShippingAddressPage/ShippingAddressPage';
import PaymentPage from './Pages/PaymentPage/PaymentPage';
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import OrderPage from './Pages/OrderPage/OrderPage';


function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <NavBar/>
      <ToastContainer position='bottom-center' limit={4}/>
      
      <main>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signin" element={<SignInPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/shipping" element={<ShippingAddressPage/>}></Route>
        <Route path="/payment" element={<PaymentPage/>}></Route>
        <Route path="/placeorder" element={<PlaceOrderPage/>}></Route>
        <Route path="/search" element={<SearchPage/>}></Route>
        <Route path='/product/:token' element={<ProductPage/>}></Route>
        <Route path='/order/:orderId' element={<OrderPage/>}></Route>






      </Routes>
     
      </main>
    </div>
      </BrowserRouter>
  );
}

export default App;