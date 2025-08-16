import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './features/auth/LoginForm';
import PrivateRoute from './routes/PrivateRoute';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/Home/DashboardHome';
import Products from './pages/dashboard/products/Products';
import CreateProduct from './pages/dashboard/products/CreateProduct';
import UpdateProduct from './pages/dashboard/products/UpdateProduct';
import Category from './pages/dashboard/Category/Category';
import MenuInfo from './pages/dashboard/MenuInfo/ManuInfo';
import Account from './pages/dashboard/Account/Account';
import MainPage from "./pages/menu/mainPage";
import { useGetMainCategoriesQuery } from "./features/Menu/MenuApi";
import MenuLayout from './components/layouts/MenuLayout';
import FavoritePage from "./pages/menu/favoritePage";
import OrderPage from "./pages/menu/orderPage";
import InformationPage from "./pages/menu/informationPage";
import CategoryPage from "./pages/menu/categoryPage";
function App() {
  const {data} = useGetMainCategoriesQuery()
  return ( 
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginForm />} />
        <Route path='/menu/*' element={
          <MenuLayout mainCategories={data!}/>
        }>
          <Route path="" element={<InformationPage/>}/>
          <Route path=":categoryName" element={<CategoryPage/>}/>
          <Route path="favorite" element={<FavoritePage/>}/>
          <Route path="orders" element={<OrderPage/>}/>

          {data?.map((m)=>(
            <Route key={m.id} path={m.name} element={<MainPage mainCategory={m.name}/>} />)
          )}
        </Route>
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

        

        <Route path="*" element={<Navigate to="/menu" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
