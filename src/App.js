  
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './COMPONENTS/Navbar';
import Inicio from './COMPONENTS/pages/Inicio.js';
import Servicios from './COMPONENTS/pages/Servicios';
import Unico from './COMPONENTS/pages/Unico';
import Masivo from './COMPONENTS/pages/Masivo';
import Ajustes from './COMPONENTS/pages/Ajustes';
import './COMPONENTS/Botones.css'
import './App.css';


function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Inicio} />
        <Route path='/servicios' component={Servicios} />
        <Route path='/unico' component={Unico} />
        <Route path='/masivo' component={Masivo} />
        <Route path='/ajustes' component={Ajustes} />
      </Switch>
    </Router>
  );
}
export default App;