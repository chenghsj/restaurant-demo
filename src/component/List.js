import React from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";

export default function List({ restaurants }) {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text, record, index) => <Link key={index} to={"/restaurant/" + record.id}>{text}</Link>
		},
		{
			title: 'Rate',
			dataIndex: 'rate',
			key: 'rate',
			align: "center",
			render: (text, record) => <span>{record.rate}</span>
		},
		{
			title: 'Reviews',
			dataIndex: 'reviews',
			key: 'review',
			align: "center",
			render: (text, record, index) => <span>{record.reviews.length}</span>
		},
	]

	return (
		<Table
			rowKey={record => record.id}
			columns={columns}
			dataSource={restaurants}
			pagination={{ pageSize: 10 }}
		/>
	);
}
