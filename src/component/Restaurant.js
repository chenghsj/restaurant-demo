import React, { useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import DispatchEvent from "../dispatchEventList";

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
		font-weight: bold;
	}
	.review_container {
		width: 100%;
		height: 200px;
		border-bottom: 1px solid black;
		overflow-y: scroll;
		padding-bottom: 1rem;
	}
	.review {
		height: 50%;
		border-bottom: 1px solid black;
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.user,
	.edited {
		display: flex;
		justify-content: flex-end;
	}
	.user {
		& span {
			margin-left: 10px;
		}
	}
	.edited {
		font-size: 0.8rem;
		color: purple;
		& span {
			cursor: pointer;
		}
	}
	button {
		margin: 10px;
	}
`;

export default function Restaurant() {
	const params = useParams();
	const [{ restaurants, users, admin }, dispatch] = useStateValue();
	const [showForm, setShowForm] = useState(false);
	const [editMode, setEditMode] = useState("");
	const [reviewId, setReviewId] = useState("");
	const restaurant = restaurants.filter((item) => item.id === params.Id)[0];

	let showReviewForm = (bool) => {
		setShowForm(bool);
	};

	let handleDeleted = (reviewId) => {
		dispatch({ type: DispatchEvent.DELETE_REVIEW, reviewId, restaurantId: restaurant.id });
	};

	return (
		<Container>
			<div className="restaurant_title">{restaurant.name}</div>
			<div className="review_container">
				{restaurant.reviews.map((review) => {
					return (
						<div key={review.id} className="review">
							<div>{review.content}</div>
							<div className="user">
								<span>Rate:&nbsp;{review.rate}</span>
								<span>
									User:&nbsp;
									{users.filter((user) => review.userId === user.id)[0].name}
								</span>
							</div>
							{admin.id === review.userId && (
								<div className="edited">
									<span
										onClick={() => {
											showReviewForm(true);
											setEditMode("edit");
											setReviewId(review.id);
										}}>
										Edit
									</span>
									&nbsp;|&nbsp;
									<span onClick={() => handleDeleted(review.id)}>delete</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
			{showForm ? (
				<ReviewForm
					onCancelClicked={showReviewForm}
					editMode={editMode}
					restaurantId={restaurant.id}
					reviewId={reviewId}
				/>
			) : (
				<button
					onClick={() => {
						showReviewForm(true);
						setEditMode("add");
					}}>
					Add Review
				</button>
			)}
		</Container>
	);
}
