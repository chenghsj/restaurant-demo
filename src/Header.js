import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
	const Header = styled.div`
		width: 100%;
		height: 50px;
		border: 1px solid black;
		position: sticky;
		top: 0;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		a {
			text-decoration: none;
		}
	`;
	return (
		<Header>
			<Link to="/">Home</Link>
		</Header>
	);
}
