import { v4 as uuidv4 } from "uuid";
export const initialState = {
	restaurants: [
		{
			name: "Restaurant 1",
			id: "res1",
			rate: 1,
			reviews: [
				{
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user2",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "Restaurant 2",
			id: "res2",
			rate: 1,
			reviews: [
				{
					userId: "user3",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "Restaurant 3",
			id: "res3",
			rate: 1,
			reviews: [
				{
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user2",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
		{
			name: "Restaurant 4",
			id: "res4",
			rate: 1,
			reviews: [
				{
					userId: "user1",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user3",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
				{
					userId: "user4",
					content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				},
			],
		},
	],
	user: [
		{ name: "John", id: "user1" },
		{ name: "Jack", id: "user2" },
		{ name: "Hue", id: "user3" },
		{ name: "Polo", id: "user4" },
	],
};

export const reducer = (state, action) => {
	let index;
	let newBasket = [...state.basket];
	switch (action.type) {
		case "ADD_TO_BASKET":
			index = state.basket.findIndex((item) => item.id === action.item.id);
			if (index >= 0) {
				newBasket[index].count = +newBasket[index].count + 1;
				if (+newBasket[index].count > 10) {
					alert("Can't buy more than 10 items");
					newBasket[index].count = 10;
				}
				return { ...state, basket: newBasket };
			} else {
				return {
					...state,
					basket: [...state.basket, { ...action.item, count: 1 }],
				};
			}
		case "REMOVE_FROM_BASKET":
			index = state.basket.findIndex((item) => item.id === action.item.id);
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(`Can't remove product (id: ${action.id}) as its not in basket!`);
			}
			return {
				...state,
				basket: newBasket,
			};
		case "CHANGE_PRODUCT_COUNT":
			index = state.basket.findIndex((item) => item.id === action.item.id);
			newBasket[index].count = action.item.count;
			console.log("change count: ", newBasket[index].count);
			return { ...state, basket: newBasket };
		case "EMPTY_BASKET":
			return { ...state, basket: [] };
		case "SET_USER":
			return { ...state, user: action.user };
		default:
			return state;
	}
};
