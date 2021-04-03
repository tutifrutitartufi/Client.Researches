import { Context } from './Contexts/Auth';


import LogIn from "./Pages/LogIn";

import { Switch, Route } from 'react-router-dom';

export default function App() {
  const { isAuth } = Context();
  return (
    <>
      {
        isAuth ?
            <Switch>
              <Route exact path="/test/" component={<div>Test</div>} />
            </Switch>
            :
            <LogIn/>
      }
    </>
  );
}
