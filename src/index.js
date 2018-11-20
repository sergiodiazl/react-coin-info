import React from 'react';
import ReactDOM from 'react-dom';
import{BrowserRouter,Route,Switch}from 'react-router-dom';
import Header from'./components/common/Header';
import List from'./components/List/List';
import NotFound from './components/NotFound/NotFound';
import Detail from './components/Detail/Detail';
import './index.css';
const App =()=>{
	const title='React Coin';
	return (
		<BrowserRouter>
		<div>
		<Header/>
		<h1>{title} </h1>
		<p>Información al dia  de criptomonedas</p>
		<Switch>
			<Route path="/" component={List} exact />
			<Route path="/currency/:id" component={Detail}/>
			<Route component={NotFound}/>
		</Switch>	
		</div>
		</BrowserRouter>);
};
ReactDOM.render(
	<App/>,document.getElementById('root')
);