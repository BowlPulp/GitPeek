import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/main/LandingPage';
import ProfilePage from './components/main/ProfilePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
