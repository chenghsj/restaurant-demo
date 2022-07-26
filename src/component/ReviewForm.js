import React, { useEffect, useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import DispatchEvent from "../dispatchEventList";
import { Form, Input, Rate, InputNumber, Radio, Row, Tooltip } from "antd";

function ReviewForm({ modalOkButtonDisabled, resetFormOnModalClosed, editMode, restaurant, restaurantId, reviewId, form }, ref) {
	const { getFieldDecorator, resetFields, getFieldsValue } = form;
	const [{ admin }, dispatch] = useStateValue();
	const [content, setContent] = useState("");
	const [rate, setRate] = useState(0);

	useEffect(() => {
		resetFormOnModalClosed.current = () => {
			// reset form value when closing modal
			setContent("");
			setRate(0);
			resetFields();
		};
	}, [])

	useEffect(() => {
		// the review has been reset when closing modal
		if (content === "" && rate === 0) return;
		// disable ok button if there is no comment or rate is zero
		if (getFieldsValue().comment === "" || getFieldsValue().rate === 0) {
			modalOkButtonDisabled(true);
		} else {
			modalOkButtonDisabled(false);
		}
	}, [content, rate])

	const getEditReview = () => {
		let filteredReview = restaurant.reviews.filter(review => review.id === reviewId);
		if (filteredReview.length > 0) {
			let { content, rate } = filteredReview[0];
			rate = parseFloat(rate);
			return { content, rate }
		} else {
			return { content: "", rate: 0 }
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		switch (editMode) {
			case "edit":
				dispatch({
					type: DispatchEvent.EDIT_REVIEW, reviewId, restaurantId, content: getFieldsValue().comment, rate: getFieldsValue().rate
				});
				break;
			case "add":
				dispatch({ type: DispatchEvent.ADD_REVIEW, admin, restaurantId, content: getFieldsValue().comment, rate: getFieldsValue().rate });
				break;
			default:
				break;
		}
		resetFields();
		modalOkButtonDisabled(true);
	};

	return (
		<Form
			id="reviewForm"
			style={{ padding: "15px" }}
			className="review_form"
			onSubmit={handleSubmit}
		>
			<div style={{ marginBottom: "10px" }} className="username">User: {admin.name}</div>
			<Form.Item style={{ marginBottom: 0 }}>
				{getFieldDecorator("comment", {
					rules: [{ required: true }],
					initialValue: editMode === "edit" ? getEditReview().content : ""
				})(
					<Input.TextArea
						id="review_form_textarea"
						rows="2"
						maxLength={100}
						onChange={(e) => {
							setContent(e.target.value);
							if (e.target.value === "") {
								modalOkButtonDisabled(true);
							}
						}}
					/>
				)}
			</Form.Item>
			<div>
				<Form.Item style={{ marginBottom: 0 }}>
					<Row>
						<label htmlFor="review_rating_select">Rate: </label>&nbsp;
						{getFieldDecorator("rate", { initialValue: editMode === "edit" ? getEditReview().rate : 0, rules: [{ required: true }] })(
							<Rate allowHalf count={3} onChange={(val) => {
								setRate(val);
								if (val === 0) {
									modalOkButtonDisabled(true);
								}
							}} />
						)}
					</Row>
				</Form.Item>
				<Form.Item style={{ marginBottom: 0 }}>
					<Row>
						{getFieldDecorator("rate", { initialValue: editMode === "edit" ? getEditReview().rate : 0, rules: [{ required: true }] })(
							<InputNumber size="small" min={0} max={3} step={0.5} onChange={(val) => {
								setRate(val);
								if (val === 0) {
									modalOkButtonDisabled(true);
								}
							}} />
						)}
					</Row>
				</Form.Item>
				<Form.Item style={{ marginBottom: 0 }}>
					<Row>
						{getFieldDecorator("rate", { initialValue: editMode === "edit" ? getEditReview().rate : 0, rules: [{ required: true }] })(
							<Radio.Group
								onChange={(val) => {
									setRate(val);
									if (val === 0) {
										modalOkButtonDisabled(true);
									}
								}}>
								<Radio value={0}>0</Radio>
								<Radio value={1}>1</Radio>
								<Radio value={2}>2</Radio>
								<Radio value={3}>3</Radio>
							</Radio.Group>
						)}
					</Row>
				</Form.Item>
			</div>
		</Form >
	);
}

export default Form.create({
	name: "review form"
})(ReviewForm);