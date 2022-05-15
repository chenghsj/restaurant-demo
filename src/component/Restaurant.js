import React from "react";
import { useStateValue } from "../StateProvider";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Restaurant() {
	const params = useParams();
	const [{ restaurants, users, admin }, dispatch] = useStateValue();

	let restaurant = restaurants.filter((item) => item.id === params.Id)[0];
	console.log(restaurant);

	const Container = styled.div`
		width: 80%;
		height: 80%;
		border: 1px solid black;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.restaurant_title {
			width: 100%;
			height: 50px;
			border-bottom: 1px solid black;
			display: flex;
			align-items: center;
			padding-left: 1rem;
			box-sizing: border-box;
		}
		.review_container {
			width: 100%;
			height: 200px;
			border-bottom: 1px solid black;
			overflow-y: scroll;
			padding-bottom: 1rem;
		}
		.review {
			height: 30%;
			border-bottom: 1px solid black;
			padding: 0 1rem;
		}
		.user {
			display: flex;
			justify-content: flex-end;
		}
	`;

	return (
		<Container>
			<div className="restaurant_title">{restaurant.name}</div>
			<div className="review_container">
				{restaurant.reviews.map((review) => {
					return (
						<div className="review">
							<div>{review.content}</div>
							<div className="user">
								User: {users.filter((user) => review.userId === user.id)[0].name}
							</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
}
