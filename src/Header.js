import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStateValue } from "./hooks/StateProvider";

const Container = styled.div`
	padding: 0 20px;
	width: 100%;
	height: 50px;
	position: sticky;
	background: #303030;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	color: white;
	a {
		text-decoration: none;
	}
`;

export default function Header() {
	const [{ admin }, dispatch] = useStateValue();

	return (
		<Container>
			<Link to="/">Home</Link>
			<div>User: {admin.name}</div>
		</Container>
	);
}
