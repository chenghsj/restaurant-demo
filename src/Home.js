import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Row, Col, Select } from 'antd';
import { useLocation } from "react-router-dom";
import List from "./component/List";
import styled from "styled-components";
import { useStateValue } from "./hooks/StateProvider";
import useDebounce from "./hooks/useDebounce";
import DispatchEvent from "./dispatchEventList";

const HomeContainer = styled.div`
	width: 60%;
	min-width: 600px;
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
	const [sortedAscend, setSortedAscend] = useState(null);
	const [sortedType, setSortedType] = useState("");
	const [dataSource, setDataSource] = useState("");

	useEffect(() => {
		dispatch({ type: DispatchEvent.RATE_AVG });
	}, [location]);

	const handleSearch = (searchText) => {
		let regExp = new RegExp(searchText, "i");
		setSearchInput(searchText.toLowerCase());
		let tempResults = restaurants.filter((restaurant) => regExp.test(restaurant.name.toLowerCase()))
		setResults(tempResults);
		setDataSource(tempResults.map(result => result.name));
	}

	const handleSelect = (value) => {
		setResults(restaurants.filter(restaurant => restaurant.name === value));
		setSearchInput(value)
	}

	//sort by name, rate, reviews
	const handleSortedTypeChange = (type) => {
		setSortedType(type);
		setSortedAscend(null)
	};

	const handleAscendChange = (value) => {
		let sortedData = [...restaurants].sort(function (a, b) {
			if (sortedType === "reviews") {
				return a[sortedType].length > b[sortedType].length ? value : -value;
			}
			return a[sortedType] > b[sortedType] ? value : -value;
		});
		setResults(sortedData);
		setSortedAscend(value);
		setSearchInput("");
	}

	return (
		<HomeContainer>
			<div className="search_container">
				<Row style={{ width: "100%" }} type="flex" justify="space-between">
					<Col>
						Sorted by&nbsp;
						<Select style={{ width: 120 }} onChange={handleSortedTypeChange}>
							<Select.Option value="name">Name</Select.Option>
							<Select.Option value="rate">Rate</Select.Option>
							<Select.Option value="reviews">Reviews</Select.Option>
						</Select>
						<Select value={sortedAscend} style={{ width: 120, marginLeft: 5 }} onChange={handleAscendChange}>
							<Select.Option value={1}>Ascend</Select.Option>
							<Select.Option value={-1}>Descend</Select.Option>
						</Select>
					</Col>
					<Col>
						<AutoComplete
							value={searchInput}
							dataSource={dataSource}
							style={{ width: 200 }}
							onSelect={handleSelect}
							onSearch={handleSearch}
							placeholder="Search..."
						/>
					</Col>

				</Row>
			</div>
			<List restaurants={results || restaurants}></List>
		</HomeContainer>
	);
}
