import { v4 as uuidv4 } from "uuid";

let data = [
	{
		name: "Restaurant 1",
		id: uuidv4(),
		rate: 1,
		comment: [
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
	{
		name: "Restaurant 2",
		id: uuidv4(),
		rate: 1,
		comment: [
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
	{
		name: "Restaurant 3",
		id: uuidv4(),
		rate: 1,
		comment: [
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
	{
		name: "Restaurant 4",
		id: uuidv4(),
		rate: 1,
		comment: [
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
			{
				id: uuidv4(),
				content: "Home Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
];

export default data;
