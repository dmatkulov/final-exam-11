import Layout from './components/IU/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import UserRegister from './features/users/UserRegister';
import UserLogin from './features/users/UserLogin';
import ProductsPage from './features/products/ProductsPage';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<ProductsPage />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
