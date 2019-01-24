import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import CatalogPage from './Components/CatalogPage/CatalogPage'

export default (
    <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/Catalog' component={CatalogPage}/>
    </Switch>
)