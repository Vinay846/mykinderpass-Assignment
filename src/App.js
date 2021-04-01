import React from 'react';
import Home from './components/Home';
import CreateEvent from './components/createEvent';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/createEvent">
					<CreateEvent />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
