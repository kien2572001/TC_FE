import React from "react";

type Props = {
  data: any[];
  rerenderTable: () => void;
};
interface DataType {
  key: React.Key;
  name: string;
  email: string;
  link: string;
  avatar: string;
}
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosJWT from "@/api/axiosJWT";

const UsersTable = ({ data, rerenderTable }: Props) => {
  const columns: ColumnsType<DataType> = [
    { title: "名前", dataIndex: "name", key: "name" },
    {
      title: "メール",
      dataIndex: "",
      key: "email",
      render: (record) => (
        <span className="text-blue-500 cursor-pointer">{record.email}</span>
      ),
    },
    {
      title: "アクション",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <>
          {record.status === "INACTIVE" ? (
            <div className="flex space-x-2">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => acceptUser(record.key)}
              >
                アクセプト
              </span>
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => rejectUser(record.key)}
              >
                拒否
              </span>
            </div>
          ) : (
            <>
              {record.status === "ACTIVE" ? (
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => rejectUser(record.key)}
                >
                  ブロック
                </span>
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => acceptUser(record.key)}
                >
                  ブロック解除
                </span>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  const acceptUser = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://13.212.172.169:3008/api/user/admin/update/" + id,
        {
          status: "ACTIVE",
        }
      );
      rerenderTable();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectUser = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://13.212.172.169:3008/api/user/admin/update/" + id,
        {
          status: "BLOCKED",
        }
      );
      if (res.status === 200) {
        rerenderTable();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default UsersTable;
