import DispatchEvent from "./dispatchEventList";
export const initialState = {
	restaurants: [
		{
			name: "The King's Eats",
			id: "res0",
			rate: 0,
			reviews: [
				{
					rate: 3,
					id: "rev0",
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 2,
					id: "rev1",
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 1,
					id: "rev2",
					userId: "user2",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 1,
					id: "rev3",
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "The Mountain Club",
			id: "res1",
			rate: 0,
			reviews: [
				{
					rate: 2,
					id: "rev0",
					userId: "user3",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 3,
					id: "rev1",
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "Potroast",
			id: "res2",
			rate: 0,
			reviews: [
				{
					rate: 3,
					id: "rev0",
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 3,
					id: "rev1",
					userId: "user2",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "The Square Factory",
			id: "res3",
			rate: 0,
			reviews: [
				{
					rate: 2,
					id: "rev0",
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 3,
					id: "rev1",
					userId: "user3",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					rate: 3,
					id: "rev2",
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
	],
	users: [
		{ name: "John", id: "user1" },
		{ name: "Jack", id: "user2" },
		{ name: "Hue", id: "user3" },
		{ name: "Polo", id: "user4" },
	],
	admin: { name: "John", id: "user1" },
};

export const reducer = (state, action) => {
	let restIdx, reviewIdx;
	let newRestaurants = [...state.restaurants];
	if (action.restaurantId) {
		restIdx = state.restaurants.findIndex((item) => item.id === action.restaurantId);
	}
	switch (action.type) {
		case "RATE_AVG":
			for (let i = 0; i < newRestaurants.length; i++) {
				let reviewArr = [...state.restaurants[i].reviews];
				newRestaurants[i].rate = Math.round(
					reviewArr.reduce(function (sum, current) {
						return sum + parseInt(current.rate);
					}, 0) / reviewArr.length
				);
			}
			return { ...state, restaurants: newRestaurants };
		//add
		case DispatchEvent.ADD_REVIEW:
			newRestaurants[restIdx].reviews.push({
				id: `rev${newRestaurants[restIdx].reviews.length}`,
				userId: action.admin.id,
				content: action.content,
				rate: action.rate,
			});
			return { ...state, restaurants: newRestaurants };
		//edit
		case DispatchEvent.EDIT_REVIEW:
			reviewIdx = state.restaurants[restIdx].reviews.findIndex(
				(review) => review.id === action.reviewId
			);
			if (reviewIdx >= 0) {
				newRestaurants[restIdx].reviews[reviewIdx].content = action.content;
				newRestaurants[restIdx].reviews[reviewIdx].rate = action.rate;
			} else {
				console.warn(`${action.reviewId} is not found`);
			}
			return { ...state, restaurants: newRestaurants };
		//delete
		case DispatchEvent.DELETE_REVIEW:
			reviewIdx = state.restaurants[restIdx].reviews.findIndex(
				(review) => review.id === action.reviewId
			);
			if (reviewIdx >= 0) {
				newRestaurants[restIdx].reviews.splice(reviewIdx, 1);
			} else {
				console.warn(`${action.reviewId} is not found`);
			}
			return { ...state, restaurants: newRestaurants };
		default:
			return state;
	}
};
