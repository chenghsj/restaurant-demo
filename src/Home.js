import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Input, Row, Col } from 'antd';
import { useLocation } from "react-router-dom";
import List from "./component/List";
import styled from "styled-components";
import { useStateValue } from "./hooks/StateProvider";
import useDebounce from "./hooks/useDebounce";
import DispatchEvent from "./dispatchEventList";
// import type { Restaurant } from "./type/type";

const HomeContainer = styled.div`
	width: 60%;
	min-width: 500px;
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

	//sort by name or rate
	const handleSortClick = (type) => {
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
				<Row style={{ width: "100%" }} type="flex" justify="space-between">
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
					<Col >
						<Row>
							<Col span={12}>
								<Button shape='round' size="small" onClick={() => handleSortClick("name")}>Sort by name</Button>
							</Col>
							<Col span={12}>
								<Button shape='round' size="small" onClick={() => handleSortClick("rate")}>Sort by rate</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
			<List restaurants={results || restaurants}></List>
		</HomeContainer>
	);
}
