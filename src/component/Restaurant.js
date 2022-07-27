import React, { useState, useRef, useEffect, Fragment } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import DispatchEvent from "../dispatchEventList";
import {
	Button, Modal, Avatar, Icon, Comment, Tooltip, Divider, Pagination,
	Row, Col, Menu, Dropdown, Checkbox, InputNumber
} from 'antd';

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
	.goBackArrow {
		transition: 0.2s;
		position: relative;
    	left: 10px;
    	border-radius: 25px;
    	padding: 3px;
		&:hover{
			box-shadow: 0px 0px 5px gray;
		}
	}
`;

export default function Restaurant() {
	const resetFormOnModalClosed = useRef(null);
	const params = useParams();
	const navigate = useNavigate()
	const [{ restaurants, users, admin }, dispatch] = useStateValue();
	const restaurant = restaurants.filter((item) => item.id === params.Id)[0];

	const [editMode, setEditMode] = useState("");
	const [reviewId, setReviewId] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [reviewModalVisible, setReviewModalVisible] = useState(false);

	const [checkAll, setCheckAll] = useState(false)
	const [checkboxVisible, setCheckboxVisible] = useState(false);
	const [checkedList, setCheckedList] = useState([])
	// pagination
	const defaultPageSize = 3;
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [pageData, setPageData] = useState({
		totalPage: 0,
		current: 1,
		minIndex: 0,
		maxIndex: 0
	})

	useEffect(() => {
		let totalPage = Math.ceil(restaurant.reviews.length / pageSize);
		setPageData({ ...pageData, totalPage, maxIndex: pageSize })
	}, [pageSize])

	const isAdmin = (review) => {
		return admin.id === review.userId;
	}

	// user comment edit and delete buttons
	const actions = (review) => {
		let admin = isAdmin(review);
		let onClickEditBtn = () => {
			setEditMode("edit");
			setReviewId(review.id);
			setReviewModalVisible(true);
			setButtonDisabled(false);
		}
		let onClickDeleteBtn = () => { confirm([review.id]); }

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
					<Icon type="edit" theme="filled" onClick={onClickEditBtn} />
				</Tooltip>
			</span>,
			admin && !checkboxVisible && <span key='delete-icon'>
				<Tooltip title="Delete">
					<Icon
						style={{ color: "red" }}
						type="delete"
						theme="filled"
						onClick={onClickDeleteBtn} />
				</Tooltip>
			</span>
		]
	};

	const optionMenu = (
		<Menu>
			<Menu.Item
				// disabled if there is no admin reviews in current page
				disabled={!restaurant?.reviews.some(review => review.userId === admin.id)}
				onClick={() => { setCheckboxVisible(true); }}
			>
				Edit
			</Menu.Item>
		</Menu>)

	const handleAddReview = () => {
		setEditMode("add");
		setReviewModalVisible(true);
	}

	const handleDelete = (removedArr) => {
		dispatch({ type: DispatchEvent.DELETE_REVIEW, reviewIdArr: removedArr, restaurantId: restaurant.id });
		setCheckboxVisible(false);
		setCheckedList([]);
		// show previous page if the page of deleted reviews is empty
		if (pageSize * (pageData.current - 1) + removedArr.length === restaurant.reviews.length) {
			onPageChange(pageData.current - 1)
		}
		setCheckAll(false);
	}

	const onCheckboxClose = () => {
		setCheckboxVisible(false);
		setCheckedList([]);
		setCheckAll(false);
	}

	const confirm = (reviewIdArr) =>
		Modal.confirm({
			title: 'Confirm',
			content: `Are you sure you want to remove ${reviewIdArr.length > 1 ? "these comments" : "this comment"} ?`,
			okText: 'Confirm',
			cancelText: 'Cancel',
			onOk: () => {
				handleDelete(reviewIdArr);
			}
		});

	const onCheckboxGroupChange = (checkedValue) => {
		setCheckedList(checkedValue);
	}

	const onCheckAllChange = (e) => {
		// find admin reviews id in current page
		let isAdminReviewsId = restaurant.reviews.filter((review, index) => {
			if (index >= pageData.minIndex && index < pageData.maxIndex) {
				return isAdmin(review);
			}
		}).map(review => review.id)
		setCheckedList(e.target.checked ? isAdminReviewsId : []);
		setCheckAll(e.target.checked);
	}


	const onPageChange = (page) => {
		setPageData(prev => ({
			...prev,
			current: page,
			minIndex: (page - 1) * pageSize,
			maxIndex: page * pageSize
		}))
	}

	const onModalOk = () => {
		setReviewModalVisible(false);
	}

	const onModalCancel = () => {
		setReviewModalVisible(false);
		resetFormOnModalClosed.current();
		setButtonDisabled(true);
	}

	return (
		<Container>
			<Row type="flex" justify="space-between" align="middle">
				<Col span={8}>
					{checkboxVisible ?
						<Checkbox
							style={{ paddingLeft: "15px" }}
							onChange={onCheckAllChange}
							checked={checkAll}
						>
							Check all
						</Checkbox> :
						<Icon className="goBackArrow" style={{ fontSize: "20px" }} type="arrow-left" onClick={() => { navigate(-1) }} />
					}
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
										onClick={onCheckboxClose}
									>
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
										size="small"
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
					onChange={onCheckboxGroupChange}
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
				<Row type="flex" align="middle">
					<Col span={8}>
						<Row type="flex" justify="start">
							<InputNumber
								style={{ width: "50px" }}
								size="small"
								disabled={checkboxVisible}
								defaultValue={defaultPageSize}
								min={defaultPageSize}
								max={defaultPageSize * 3}
								step={defaultPageSize}
								onChange={val => {
									setPageSize(val);
									onPageChange(1)
								}}
							/>
							&nbsp;comments&nbsp;/&nbsp;page
						</Row>
					</Col>
					<Col span={8}>
						<Row type="flex" justify="center">
							<Pagination
								size="small"
								disabled={checkboxVisible}
								defaultCurrent={1}
								current={pageData.current}
								pageSize={pageSize}
								total={restaurant.reviews.length}
								onChange={onPageChange}
							/>
						</Row>
					</Col>
					<Col span={8}>
						<Row type="flex" justify="end">
							<Button
								size="small"
								style={{ margin: "10px", marginRight: "0" }}
								type="primary"
								disabled={checkboxVisible}
								onClick={handleAddReview}>
								Add Review
							</Button>
						</Row>
					</Col>
				</Row>
				<Modal
					visible={reviewModalVisible}
					okButtonProps={{ htmlType: 'submit', form: 'reviewForm', disabled: buttonDisabled }}
					onOk={onModalOk}
					onCancel={onModalCancel}
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
