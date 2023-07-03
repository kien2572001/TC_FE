import React from "react";

type Props = {
  data: any[];
  rerenderTable: () => void;
  navigateTo: (url: string) => void;
};
import Link from "next/link";
interface DataType {
  key: React.Key;
  name: string;
  price: number;
  link: string;
  description: string;
  image: string;
}
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosJWT from "@/api/axiosJWT";

const FoodsTable = ({ data, rerenderTable, navigateTo }: Props) => {
  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Link",
      dataIndex: "",
      key: "link",
      render: (record) => (
        <div onClick={() => navigateTo(record.link)}>
          <span className="text-blue-500 cursor-pointer">View</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <>
          {record.status === "INACTIVE" ? (
            <div className="flex space-x-2">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => acceptFood(record.key)}
              >
                Accept
              </span>
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => rejectFood(record.key)}
              >
                Reject
              </span>
            </div>
          ) : (
            <>
              {record.status === "ACTIVE" ? (
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => rejectFood(record.key)}
                >
                  Block
                </span>
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => acceptFood(record.key)}
                >
                  Unblock
                </span>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  const acceptFood = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://localhost:3008/api/foods/admin/update/" + id,
        {
          status: "ACTIVE",
        }
      );
      rerenderTable();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectFood = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://localhost:3008/api/foods/admin/update/" + id,
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
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: "10px" }}>
              <div className="flex space-x-2 h-[100px]">
                <div className="h-full">
                  <img src={record.image} alt="" className="h-full" />
                </div>
                <div className="h-full ml-4">
                  <p>
                    <span className="font-bold">Price: </span> {record.price}{" "}
                    VND
                  </p>
                  <p>
                    <span className="font-bold">Description: </span>{" "}
                    {record.description}
                  </p>
                </div>
              </div>
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

export default FoodsTable;
