"use client";
import React, { useEffect, useState } from 'react';
import { Space, Table, Input } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import axios from 'axios';
import { User } from '@/models/user';
import userApi from '@/api/userApi';

type Props = {};


const columns: ColumnsType<User> = [
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



const UserManage: React.FC<Props> = () => {
  const pagination: TablePaginationConfig = {
    pageSize: 5,
  };
  const [users, setUsers] = useState<User[]>();
  const [query, setQuery] = useState('');

  const onSearch = (value: any) => {
    console.log(value);
    setQuery(value);
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      const usersRes = await userApi.getAllUsers();
      setUsers(usersRes);
    }
    fetchAllUsers();
  }, [])

  useEffect(() => {
    const fetchUsersBySearch = async () => {
      const usersFound = await userApi.searchUserByName(query);
      console.log(usersFound);

    }
    fetchUsersBySearch();
  }, [query])

  // useEffect(() => {
  //   console.log(users);
  // }, users)

  return (
    <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
      <div className="flex max-w-[1200px] 2xl:max-w-[1500px] h-[800px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[600px] min-h-[400px] space-y-[10px] bg-white">
        <div className="pb-[20px] border-solid border-gray border-0 border-b-[1px] flex flex-row">
          <h1 className="leading-none w-full">ユーザー管理</h1>
          {/* search */}
          <Input.Search placeholder="ユーザー名" allowClear onSearch={onSearch} enterButton className="m-auto" />
        </div>
        <>
          <Table columns={columns} dataSource={users} pagination={pagination} />
        </>
      </div>
    </div>
  );
}

export default UserManage;