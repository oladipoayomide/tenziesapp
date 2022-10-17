
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main';
import NotPage from './NotPage';

function App() {


    return (
        <Router>

            <Switch>
                <Route exact path='/'>
                    <Main />
                </Route>
                <Route exact path='/*'>
                    <NotPage />
                </Route>

            </Switch>


        </Router>
    )
}

export default App;
