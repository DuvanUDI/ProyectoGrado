import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import ReactDOM from 'react-dom/client';

function App(){
    return (
        <Router>
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/library" component={Library} />
                <Route component={NotFound} />
            </Routes>
        </Router>
    );
}

const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
    <div>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);

export default App;