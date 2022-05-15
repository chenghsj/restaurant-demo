import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
	.restaurant_list {
		list-style: none;
		padding: 0;
		border: 1px solid black;
		border-bottom: transparent;
		& a {
			text-decoration: none;
			color: black;
		}
		& li {
			position: relative;
			border-bottom: 1px solid black;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20px;
		}
	}
`;

export default function List({ restaurants }) {
	return (
		<ListContainer>
			<ul className="restaurant_list">
				{restaurants.map((item) => {
					return (
						<Link key={item.id} to={"/restaurant/" + item.id}>
							<li>
								<span>{item.name}</span>
								<span>Rating {item.rate}</span>
							</li>
						</Link>
					);
				})}
			</ul>
		</ListContainer>
	);
}
