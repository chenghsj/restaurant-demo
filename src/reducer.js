import { v4 as uuidv4 } from "uuid";
export const initialState = {
	restaurants: [
		{
			name: "The King's Eats",
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
			name: "The Mountain Club",
			id: "res2",
			rate: 3,
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
			name: "Potroast",
			id: "res3",
			rate: 2,
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
			name: "The Square Factory",
			id: "res4",
			rate: 3,
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
	users: [
		{ name: "John", id: "user1" },
		{ name: "Jack", id: "user2" },
		{ name: "Hue", id: "user3" },
		{ name: "Polo", id: "user4" },
	],
	admin: { name: "Hue", id: "user3" },
};

export const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
