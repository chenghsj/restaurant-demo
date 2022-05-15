import React from "react";
import data from "../data";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

export default function List() {
	const [{ restaurants }, dispatch] = useStateValue();
	return (
		<div>
			<ul className="restaurant_list">
				{restaurants.map((item) => {
					return (
						<Link key={item.id} to={"/restaurant/" + item.id}>
							<li>
								<span>{item.name}</span>
								<span>Rating {item.rate}</span>
							</li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
}
