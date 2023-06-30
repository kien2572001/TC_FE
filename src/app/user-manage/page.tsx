"use client";
import React from 'react';
import { Space, Table, Input } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

type Props = {};

interface DataType {
  key: string;
  ID: number;
  username: string;
  email: string;
}


const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'ユーザー名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'メール',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    width: 360,
    render: () => (
      <Space size="middle">
        <a>アクセプト</a>
        <a>ブロック</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    ID: 1,
    username: 'John Brown',
    email: 'example1@gmail.com',
  },
  {
    key: '2',
    ID: 2,
    username: 'John Brown',
    email: 'example1@gmail.com',
  },
  {
    key: '3',
    ID: 3,
    username: 'John Brown',
    email: 'example1@gmail.com',
  },
];

const UserManage: React.FC<Props> = () => {
    return (
        <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
            <div className="flex max-w-[1200px] 2xl:max-w-[1500px] h-[800px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[600px] min-h-[400px] space-y-[10px] bg-white">
                <div className="pb-[20px] border-solid border-gray border-0 border-b-[1px] flex flex-row">
                <h1 className="leading-none w-full">ユーザー管理</h1>
                {/* search */}
                <Input.Search placeholder="ユーザー名" allowClear onSearch={value => console.log(value)} enterButton className="m-auto"/>
                </div>
                <>
                <Table columns={columns} dataSource={data}/>
                </>
            </div>
        </div>
    );
}

export default UserManage;