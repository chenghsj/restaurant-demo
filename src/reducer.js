import { v4 as uuidv4 } from 'uuid';
import DispatchEvent from "./dispatchEventList";
import data from "./data.json";
// import type {State, Action} from "./type/type"

export const initialState = JSON.parse(JSON.stringify(data));

export const reducer = (state, action) => {
	let restIdx = -1, reviewIdx = -1;
	let newRestaurants = [...state.restaurants];
	if (action.restaurantId) {
		restIdx = state.restaurants.findIndex((item) => item.id === action.restaurantId);
	}
	switch (action.type) {
		case DispatchEvent.RATE_AVG:
			for (let i = 0; i < newRestaurants.length; i++) {
				let reviewArr = [...state.restaurants[i].reviews];
				newRestaurants[i].rate = parseFloat((reviewArr.reduce(function (sum, current) {
					return sum + (current.rate);
				}, 0) / reviewArr.length
				).toFixed(1));
			}
			return { ...state, restaurants: newRestaurants };
		//add
		case DispatchEvent.ADD_REVIEW:
			newRestaurants[restIdx].reviews.push({
				id: `rev${uuidv4()}`,
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
			newRestaurants[restIdx].reviews = state.restaurants[restIdx].reviews.filter(i => !action.reviewIdArr.some(j => j === i.id));
			return { ...state, restaurants: newRestaurants };
		default:
			return state;
	}
};
