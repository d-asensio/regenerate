import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet'

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Grommet plain>
      <App />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
