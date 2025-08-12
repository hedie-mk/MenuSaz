import LoginForm from './features/auth/LoginForm';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/Home/DashboardHome';
import Products from './pages/dashboard/products/Products';
import CreateProduct from './pages/dashboard/products/CreateProduct';
import UpdateProduct from './pages/dashboard/products/UpdateProduct';
import Category from './pages/dashboard/Category/Category';
import MenuInfo from './pages/dashboard/MenuInfo/ManuInfo';
import Account from './pages/dashboard/Account/Account';
function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginForm />} />

        {/* مسیر محافظت‌شده با layout */}
        <Route path="/dashboard/*" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path='home' element={<DashboardHome/>} />
          <Route path='products' element={<Products/>} />
          <Route path='products/create' element={<CreateProduct/>}/>
          <Route path='products/update/:id' element={<UpdateProduct/>}/>
          <Route path='categories' element={<Category/>}/>
          <Route path='menuInfo' element={<MenuInfo/>}/>
          <Route path='account' element={<Account/>}/>
        </Route>

        {/* پیش‌فرض: redirect به menu */}
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
