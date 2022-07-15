import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import List from "./component/List";
import styled from "styled-components";
import { useStateValue } from "./hooks/StateProvider";
import useDebounce from "./hooks/useDebounce";
import DispatchEvent from "./dispatchEventList";
import { Button, Input } from 'antd';

const HomeContainer = styled.div`
	width: 50%;
	position: relative;
	margin: auto;
	.search_container {
		margin-top: 10px;
		width: 100%;
		height: 70px;
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		flex-direction: column;
		box-sizing: border-box;
		padding: 5px 0;
		& input {
			height: 20px;
		}
		& button {
			margin-right: 10px;
		}
	}
`;

export default function Home() {
	const location = useLocation();
	const [searchInput, setSearchInput] = useState("");
	const [{ restaurants }, dispatch] = useStateValue();
	const [results, setResults] = useState();
	const [sortAscend, setSortAscend] = useState(1);
	const debouncedInput = useDebounce(searchInput, 500);

	useEffect(() => {
		dispatch({ type: DispatchEvent.RATE_AVG });
	}, [location]);

	useEffect(() => {
		if (debouncedInput) {
			let regExp = new RegExp(searchInput, "i");
			setResults(restaurants.filter((restaurant) => regExp.test(restaurant.name.toLowerCase())));
		} else {
			setResults(restaurants);
		}
	}, [debouncedInput]);

	let handleInputChange = (e) => {
		setSearchInput(e.target.value.toLowerCase());
	};

	//sort by name or rate
	let handleSortClick = (type) => {
		let sortedData = [...restaurants].sort(function (a, b) {
			return a[type] > b[type] ? sortAscend : -sortAscend;
		});
		setSortAscend(-sortAscend);
		setResults(sortedData);
		setSearchInput("");
	};

	return (
		<HomeContainer>
			<div className="search_container">
				<Input size="small" placeholder="Search..." value={searchInput}
					onChange={handleInputChange} />
				<div>
					<Button shape='round' size="small" onClick={() => handleSortClick("name")}>Sort by name</Button>
					<Button shape='round' size="small" onClick={() => handleSortClick("rate")}>Sort by rate</Button>
				</div>
			</div>
			<List restaurants={results || restaurants}></List>
		</HomeContainer>
	);
}
