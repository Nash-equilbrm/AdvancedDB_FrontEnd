import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/pages/HomePage';
import { Header } from './features/components/Header';
import Footer from './features/components/Footer';
import './App.css';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
};
import ThreadPage from './features/pages/ThreadPage';
import PostPage from './features/pages/PostPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow main-page">
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/thread/:threadId/:parentThreadId" element={<ThreadPage />} />
            <Route path="/thread/:threadId/posts" element={<PostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
