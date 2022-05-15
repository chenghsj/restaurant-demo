import React, { useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import DispatchEvent from "../dispatchEventList";
import styled from "styled-components";

const ReviewFormContainer = styled.form`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 1rem;
	.username {
		margin-bottom: 10px;
	}
	button,
	select {
		margin: 10px 0;
		margin-right: 10px;
	}
`;

export default function ReviewForm({ onCancelClicked, editMode, restaurantId, reviewId }) {
	const [{ admin }, dispatch] = useStateValue();
	const [content, setContent] = useState("");
	const [rate, setRate] = useState(0);
	let closeForm = () => {
		onCancelClicked(false);
	};

	let handleSubmit = () => {
		switch (editMode) {
			case "edit":
				dispatch({ type: DispatchEvent.EDIT_REVIEW, reviewId, restaurantId, content, rate });
				break;
			case "add":
				dispatch({ type: DispatchEvent.ADD_REVIEW, admin, restaurantId, content, rate });
				break;
			default:
				break;
		}
		onCancelClicked(false);
	};

	return (
		<ReviewFormContainer onSubmit={handleSubmit} className="review_form">
			<div className="username">User: {admin.name}</div>
			<textarea
				name=""
				id="review_form_textarea"
				cols="20"
				rows="10"
				maxLength={150}
				value={content}
				onChange={(e) => setContent(e.target.value)}></textarea>
			<div>
				<label htmlFor="review_rating_select">Rate: </label>
				<select onChange={(e) => setRate(e.target.value)} id="review_rating_select">
					<option value="">Choose</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				<button type="submit">{editMode === "edit" ? "Edit" : "Add"}</button>
				<button onClick={closeForm}>Cancel</button>
			</div>
		</ReviewFormContainer>
	);
}
