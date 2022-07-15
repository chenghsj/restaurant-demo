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
			render: (text, record) => <span>{record.rate}</span>
		}
	]
	return (
		<Table columns={columns} dataSource={restaurants} pagination={{ pageSize: 10 }} />
	);
}
