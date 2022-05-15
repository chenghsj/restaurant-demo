import DispatchEvent from "./dispatchEventList";
import data from "./data.json";
export const initialState = JSON.parse(JSON.stringify(data));

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
