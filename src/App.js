import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {store, persistor} from '../src/store/';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Login from './view/login';
import Home from './view/home';
import Computadores from './view/computadores';
import NovoComputador from './view/computadores/novo-computador';
import DetalhesComputador from './view/computadores/detalhes-computador';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <Router>
     <Route exact path="/" component={Login}></Route>
     <Route exact path="/home" component={Home}></Route>
     <Route exact path="/computador" component={Computadores}></Route>
     <Route exact path="/novo-computador" component={NovoComputador}></Route>
     <Route exact path="/detalhes-computador" component={DetalhesComputador}></Route>
   </Router>
   </PersistGate>
   </Provider>
  );
}

export default App;
