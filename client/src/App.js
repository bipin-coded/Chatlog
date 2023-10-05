import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Dashboard />} path="/" exact />
      </Route>
      <Route path="/users/sign_in" element={<Form isSignInPage={true} />} />
      <Route path="/users/sign_up" element={<Form isSignInPage={false} />} />
    </Routes>
  );
}

export default App;
