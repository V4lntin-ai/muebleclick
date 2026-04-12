import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout'; // <-- Nuevo Layout
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MuebleriaDashboardPage } from './pages/MuebleriaDashboardPage'; // <-- Nueva Vista
//import { AdminDashboardPage } from './pages/AdminDashboardPage'; // <-- Nueva Vista

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/registro" element={<PublicLayout><RegisterPage /></PublicLayout>} />

        {/* RUTAS DEL PANEL INTERNO */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Aquí puedes intercambiar entre <MuebleriaDashboardPage /> o <AdminDashboardPage /> para ver ambos diseños */}
          <Route index element={<MuebleriaDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;