import React from "react";
import { Link } from "react-router-dom";

export default function List({ restaurants }) {
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
