import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Restaurant from "./component/Restaurant";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						exact
						path="/"
						element={
							<>
								<Header />
								<Home />
							</>
						}></Route>
					<Route
						exact
						path="/restaurant/:Id"
						element={
							<>
								<Header />
								<Restaurant />
							</>
						}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
