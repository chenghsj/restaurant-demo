import React, { useState, useRef, useEffect, Fragment } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import DispatchEvent from "../dispatchEventList";
import { Button, Modal, Avatar, Icon, Comment, Tooltip, Divider, Pagination, Row, Col, Menu, Dropdown, Checkbox } from 'antd';

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
`;

export default function Restaurant() {
	const resetFormOnModalClosed = useRef(null);
	const params = useParams();
	const [{ restaurants, users, admin }, dispatch] = useStateValue();
	const [editMode, setEditMode] = useState("");
	const [reviewId, setReviewId] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [reviewModalVisible, setReviewModalVisible] = useState(false);
	const [checkboxVisible, setCheckboxVisible] = useState(false);
	const [checkedList, setCheckedList] = useState([])
	const restaurant = restaurants.filter((item) => item.id === params.Id)[0];
	// pagination
	const pageSize = 3;
	const [pageData, setPageData] = useState({
		totalPage: 0,
		current: 1,
		minIndex: 0,
		maxIndex: 0
	})

	useEffect(() => {

	})

	useEffect(() => {
		let totalPage = Math.ceil(restaurant.reviews.length / pageSize);
		setPageData({ ...pageData, totalPage, maxIndex: pageSize })
	}, [])

	const isAdmin = (review) => {
		return admin.id === review.userId;
	}

	// user comment edit and delete buttons
	const actions = (review) => {
		let admin = isAdmin(review)
		return [
			<Tooltip title="Rate">
				<span
					style={{ paddingRight: "20px", cursor: "default" }}
					key="rate-icon">
					<Icon
						style={{ color: "#ffd60b", fontSize: "1rem" }}
						theme="filled"
						type="star" /> : {review.rate}
				</span>
			</Tooltip>,
			admin && !checkboxVisible && <span key="edit-icon">
				<Tooltip title="Edit">
					<Icon type="edit" theme="filled" onClick={() => {
						setEditMode("edit");
						setReviewId(review.id);
						setReviewModalVisible(true);
						setButtonDisabled(false);
					}} />
				</Tooltip>
			</span>,
			admin && !checkboxVisible && <span key='delete-icon'>
				<Tooltip title="Delete">
					<Icon
						style={{ color: "red" }}
						type="delete"
						theme="filled"
						onClick={() => {
							confirm([review.id]);
						}} />
				</Tooltip>
			</span>
		]
	};

	const optionMenu = (
		<Menu>
			<Menu.Item
				disabled={!restaurant?.reviews.some(review => review.userId === admin.id)}
				onClick={() => {
					setCheckboxVisible(true);
				}}
			>
				Edit
			</Menu.Item>
		</Menu>)

	const handleDelete = (removedArr) => {
		dispatch({ type: DispatchEvent.DELETE_REVIEW, reviewIdArr: removedArr, restaurantId: restaurant.id });
		setCheckboxVisible(false);
		setCheckedList([]);
		// if the review is the last one of the page, then show previous page
		if (pageSize * (pageData.current - 1) + 1 === restaurant.reviews.length) {
			handlePageChange(pageData.current - 1)
		}
	}

	const confirm = (reviewIdArr) =>
		Modal.confirm({
			title: 'Confirm',
			content: `Are you sure you want to remove ${reviewIdArr.length > 1 ? "these" : "this"} comment?`,
			okText: 'Confirm',
			cancelText: 'Cancel',
			onOk: () => {
				handleDelete(reviewIdArr);
			}
		});

	const handleCheckboxGroupChange = (checkedValue) => {
		setCheckedList(checkedValue);
	}


	const handlePageChange = (page) => {
		setPageData(prev => ({
			...prev,
			current: page,
			minIndex: (page - 1) * pageSize,
			maxIndex: page * pageSize
		}))
	}

	return (
		<Container>
			<Row type="flex" justify="space-between" align="middle">
				<Col span={8}>
					{checkboxVisible &&
						<Checkbox
							style={{ paddingLeft: "15px" }}
							onChange={() => { }}
						/>}
				</Col>
				<Col span={8}>
					<Row className="restaurant_title" type="flex" justify="center" >
						{restaurant.name}
					</Row>
				</Col>
				<Col span={8}>
					<Row type="flex" justify="end">
						{
							checkboxVisible ?
								<>
									<Button
										style={{ marginRight: "10px" }}
										size="small"
										onClick={() => {
											setCheckboxVisible(false);
											setCheckedList([]);
										}}>
										Close
									</Button>
									<Button
										type="danger"
										size="small"
										disabled={checkedList.length > 0 ? false : true}
										onClick={() => confirm(checkedList)}
									>
										Delete
									</Button>
								</> :
								<Dropdown overlay={optionMenu} trigger={['click']}>
									<Button
										style={{ padding: "0 10px" }}
									>
										<Icon style={{ fontSize: "20px", transform: "rotate(90deg)" }} type="more" />
									</Button>
								</Dropdown>
						}
					</Row>
				</Col>
			</Row>
			<div className="review_container">
				<Checkbox.Group
					style={{ width: "100%" }}
					value={checkedList}
					onChange={handleCheckboxGroupChange}
				>
					{restaurant.reviews.map((review, index) => {
						return (
							index >= pageData.minIndex &&
							index < pageData.maxIndex &&
							(<Fragment key={index}>
								<Row type="flex" align="middle">
									{checkboxVisible && isAdmin(review) &&
										<Col>
											<Checkbox
												value={review.id}
												style={{ marginRight: "10px" }}>
											</Checkbox>
										</Col>
									}
									<Col>
										<Comment
											author={users.filter((user) => review.userId === user.id)[0].name}
											avatar={<Avatar style={{ cursor: "default" }} icon="user" size={30} />}
											actions={actions(review)}
											content={<Tooltip title="Comment">{review.content}</Tooltip>} />
									</Col>
								</Row>

								<Divider style={{ margin: "10px 0" }} />
							</Fragment>)
						);
					})}
				</Checkbox.Group>
			</div>
			<>
				<Row type="flex" justify="space-between" align="middle">
					<Col>
						<Pagination
							disabled={checkboxVisible}
							defaultCurrent={1}
							current={pageData.current}
							pageSize={pageSize}
							total={restaurant.reviews.length}
							onChange={handlePageChange}
						/>
					</Col>
					<Col>
						<Button
							style={{ margin: "10px" }}
							type="primary"
							disabled={checkboxVisible}
							onClick={() => {
								setEditMode("add");
								setReviewModalVisible(true);
							}}>
							Add Review
						</Button>
					</Col>

				</Row>
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
		</Container >
	);
}
