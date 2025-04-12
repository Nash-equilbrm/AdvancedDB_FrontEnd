import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { LoginPage } from './features/auth/LoginPage';
import ThreadPage from './pages/ThreadPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow main-page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
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
