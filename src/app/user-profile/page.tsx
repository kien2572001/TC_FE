"use client";
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Form, Input, Button } from 'antd';

type Props = {};

const UserProfile: React.FC<Props> = () => {
    return (
        <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
            <div className="flex max-w-[1200px] 2xl:max-w-[1500px] h-[800px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[600px] min-h-[400px] space-y-[10px] bg-white">
            <h1 className="leading-none pb-[20px] border-solid border-gray border-0 border-b-[1px]">プロフィール</h1>
                <div className="flex flex-row m-auto space-x-4">
                    <div className="flex flex-col m-auto max-w-[600px] mx-[50px]">
                        <Avatar size={200} icon={<UserOutlined/>}/>
                        <Button size="middle" className="mt-[30px]" type="default">イメージチェンジ</Button>
                    </div>
                    <div className="w-[900px] flex pt-[20px]">
                    <Form
                        style={{ maxWidth: 60 , margin: "auto" , minWidth: 600 }}
                        layout="vertical"
                    >
                        <Form.Item label="ユーザー名">
                            <Input placeholder="ユーザー名" />
                        </Form.Item>
                        <Form.Item label="フルネーム">
                            <Input placeholder="フルネーム" />
                        </Form.Item>
                        <Form.Item label="Eメール">
                            <Input placeholder="Eメール" />
                        </Form.Item>
                        <Form.Item label="パスワード">
                            <Input placeholder="パスワード" />
                        </Form.Item>
                        <Form.Item className="flex flex-row-reverse">
                            <Button 
                                type="primary"
                                size="large"
                                style={{ backgroundColor: "#FF903F"}}
                            >
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserProfile;