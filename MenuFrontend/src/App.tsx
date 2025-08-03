import LoginForm from './features/auth/LoginForm';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/Home/DashboardHome';
import Products from './pages/dashboard/products/Products';
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
          {/* مسیرهای دیگر داشبورد رو هم می‌تونی اینجا اضافه کنی */}
        </Route>

        {/* پیش‌فرض: redirect به menu */}
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
