import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate
import { SignupProvider } from './context/SignupProvider';
import SignupFlow from './Components/Auth/NewUser/JsxFiles/SignupFlow';

function App() {
  return (
    <SignupProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignupFlow />} />
        </Routes>
      </Router>
    </SignupProvider>
  )
}

export default App;