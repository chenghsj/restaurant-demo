import React, { useState, useRef } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import DispatchEvent from "../dispatchEventList";
import { Row, Col, Button, Card, Modal, Avatar, Icon, Rate } from 'antd';

const Container = styled.div`
	width: 80%;
	min-width: 500px;
	height: 80%;
	porder-radius: 5px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	.restaurant_title {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		padding-left: 1rem;
		box-sizing: border-box;
		font-weight: bold;
	}
	.review_container {
		width: 100%;
		height: 80%;
		border: 1px solid #8c8c8c;
		overflow-y: scroll;
		padding: 1rem;
	}
	.review {
		height: 50%;
		border-bottom: 1px solid #e8e8e8;
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	}
`;

export default function Restaurant() {
	const resetFormOnModalClosed = useRef(null);
	const params = useParams();
	const [{ restaurants, users, admin }, dispatch] = useStateValue();
	const [editMode, setEditMode] = useState("");
	const [reviewId, setReviewId] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [reviewModalVisible, setReviewModalVisible] = useState(false);
	const restaurant = restaurants.filter((item) => item.id === params.Id)[0];

	let handleDeleted = (reviewId) => {
		dispatch({ type: DispatchEvent.DELETE_REVIEW, reviewId, restaurantId: restaurant.id });
	};

	function confirm(reviewId) {
		Modal.confirm({
			title: 'Confirm',
			content: 'Are you sure you want to remove this comment?',
			okText: 'Confirm',
			cancelText: 'Cancel',
			onOk: () => {
				handleDeleted(reviewId);
			}
		});
	}

	return (
		<Container>
			<div className="restaurant_title">{restaurant.name}</div>
			<div className="review_container">
				{restaurant.reviews.map((review) => {
					return (
						<Card key={review.id} >
							<Row>
								<Col span={3}>
									<Row>
										<Avatar icon="user" size={30} />
									</Row>
									<Row>
										<span style={{ color: '#ff5f5f', fontWeight: "bold" }}>{users.filter((user) => review.userId === user.id)[0].name}</span>
									</Row>
								</Col>
								<Col>
									<Row style={{overflowWrap: "anywhere"}}>
										<Col>{review.content}</Col>
									</Row>
									<Row type="flex" justify="end" align="bottom" style={{marginTop: "10px"}}>
										{admin.id === review.userId && (
											<Col span={21}>
												<Button.Group size="small">
													<Button
														onClick={() => {
															setEditMode("edit");
															setReviewId(review.id);
															setReviewModalVisible(true);
															setButtonDisabled(false);
														}}>
														<Icon type="edit" theme="filled"></Icon>
													</Button>
													<Button style={{ color: "#ff4d4f" }} onClick={() => {
														// setDeleteModalVisible(true);
														confirm(review.id);
														// handleDeleted(review.id)
													}}>
														<Icon type="delete" theme="filled"></Icon>
													</Button>

												</Button.Group>
											</Col>
										)}
										<Col span={3}>
											<Icon style={{ color: "#ffd60b", fontSize: "1rem" }} theme="filled" type="star" /> : {review.rate}
										</Col>
									</Row>
								</Col>
							</Row>
						</Card>
					);
				})}
			</div>
			<>
				<Button
					style={{ margin: "10px" }}
					onClick={() => {
						setEditMode("add");
						setReviewModalVisible(true);
					}}>
					Add Review
				</Button>
				<Modal
					visible={reviewModalVisible}
					okButtonProps={{ htmlType: 'submit', form: 'reviewForm', disabled: buttonDisabled }}
					onOk={() => {
						setReviewModalVisible(false);
					}}
					onCancel={() => {
						setReviewModalVisible(false);
						resetFormOnModalClosed.current();
						setButtonDisabled(true);
					}}
					okText={editMode === "edit" ? "Edit" : "Add"}
					centered
				>
					<ReviewForm
						editMode={editMode}
						restaurantId={restaurant.id}
						reviewId={reviewId}
						restaurant={restaurant}
						resetFormOnModalClosed={resetFormOnModalClosed}
						modalOkButtonDisabled={setButtonDisabled}
					/>
				</Modal>
			</>
		</Container>
	);
}
