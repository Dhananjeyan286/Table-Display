import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './Components/Header';
import Homescreen from './Screens/Homescreen';
import Editscreen from './Screens/Editscreen';
import Footer from './Components/Footer';

const App = () => {
  	return (
	<Router>
    	<div className='container'>
			<Header />
			<main className='py-3'>
				<Route path="/user/:id" component={Editscreen} />
				<Route path="/" exact component={Homescreen} />
			</main>
			<Footer />
		</div>
	</Router>
	);
};

export default App;
