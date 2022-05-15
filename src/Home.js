import React, { useEffect, useState } from "react";
import List from "./component/List";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import useDebounce from "./hooks/useDebounce";
import Restaurant from "./component/Restaurant";

export default function Home() {
	const [searchInput, setSearchInput] = useState("");
	const [{ restaurants }, dispatch] = useStateValue();
	let [results, setResults] = useState();
	let [sortAscend, setSortAscend] = useState(1);

	const debouncedInput = useDebounce(searchInput, 500);

	useEffect(() => {
		if (debouncedInput) {
			let regExp = new RegExp(searchInput, "i");
			setResults(
				restaurants.filter((restaurant) =>
					regExp.test(restaurant.name.replace(" ", "").toLowerCase())
				)
			);
		} else {
			setResults(restaurants);
		}
	}, [debouncedInput]);

	let handleInputChange = (e) => {
		setSearchInput(e.target.value.replace(" ", "").toLowerCase());
	};

	let handleSortClick = (type) => {
		let sortedData = [...restaurants].sort(function (a, b) {
			return a[type] > b[type] ? sortAscend : -sortAscend;
		});
		setSortAscend(-sortAscend);
		setResults(sortedData);
	};

	return (
		<div className="home_container">
			<div className="search_container">
				<input placeholder="Search..." type="text" onChange={handleInputChange} />
				<div>
					<button onClick={() => handleSortClick("name")}>Sort by name</button>
					<button onClick={() => handleSortClick("rate")}>Sort by rate</button>
				</div>
			</div>
			<List restaurants={results || restaurants}></List>
		</div>
	);
}
