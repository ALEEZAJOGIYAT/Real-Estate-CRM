import React from "react";
import { Table, Space, Button } from "antd";
import { Icons } from "../../../assets";


const CustomTable = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'MobileNo',
      dataIndex: 'mobNo',
      key: 'mobNo',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Update',
      key: 'Update',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text">
            <img src={Icons.editIcon} />
          </Button>
          <Button type="text"> <img src={Icons.deleteIcon} /> </Button>
        </Space>
      ),
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}


export default CustomTable;