import { Context as AuthContext } from './Contexts/Auth';


import LogIn from "./Pages/LogIn";
import Dashboard from "./Pages/Dashboard";

import {
  List as ResearchList,
  Show as ResearchShow,
  New as ResearchNew
} from "./Pages/Researches";

import {
  List as UserList,
  Show as UserShow,
  Edit as UserEdit,
  New as UserNew
} from "./Pages/Users";


import REDrawer from "./Pages/Components/Controls/REDrawer";

import { Switch, Route } from 'react-router-dom';

export default function App() {
  const { isAuth } = AuthContext();
  return (
    <>
      {
        isAuth ?
            <REDrawer>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/researches" component={ResearchList} />
                <Route exact path="/researches/new" component={ResearchNew} />
                <Route exact path="/researches/:id" component={ResearchShow} />
                <Route exact path="/users" component={UserList} />
                <Route exact path="/users/new" component={UserNew} />
                <Route exact path="/users/:id" component={UserShow} />
                <Route exact path="/users/edit/:id" component={UserEdit} />
              </Switch>
            </REDrawer>
            :
            <LogIn/>
      }
    </>
  );
}
