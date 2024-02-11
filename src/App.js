import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Provider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterAdmin from './pages/auth/RegisterAdmin';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-admin" element={<RegisterAdmin />} />
        </Routes>
      </Router>
    </Provider>
  )

}

export default App;
