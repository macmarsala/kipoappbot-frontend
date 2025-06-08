import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SchedulePage from "./pages/SchedulePage";
import GradesPage from "./pages/GradesPage";
import DocumentsPage from "./pages/DocumentsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { MobileNav } from "./components/MobileNav";
import { PrivateRoute } from "./components/PrivateRoute";

function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const pathsWithNav = ["/", "/schedule", "/grades", "/documents", "/profile"];

  const showNav = pathsWithNav.includes(location.pathname);

  return (
    <div className="pb-16">
      {children}
      {showNav && <MobileNav />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <LayoutWithNav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/schedule" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
          <Route path="/grades" element={<PrivateRoute><GradesPage /></PrivateRoute>} />
          <Route path="/documents" element={<PrivateRoute><DocumentsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LayoutWithNav>
    </BrowserRouter>
  );
}

export default App;
