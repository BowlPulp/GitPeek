import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/main/LandingPage';
import ProfilePage from './components/main/ProfilePage';
import ContactUS from './components/contact/ContactUs';
import NotFound from './components/404/NotFound';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path='/contact' element={<div>{<ContactUS/>}</div>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
