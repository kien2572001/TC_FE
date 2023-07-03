"use client";
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
  age: number;
  address: string;
  description: string;
}
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosJWT from "@/api/axiosJWT";
import { useRouter } from "next/router";

const RestaurantsTable = ({ data, rerenderTable, navigateTo }: Props) => {
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
                onClick={() => acceptRestaurant(record.key)}
              >
                Accept
              </span>
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => rejectRestaurant(record.key)}
              >
                Reject
              </span>
            </div>
          ) : (
            <>
              {record.status === "ACTIVE" ? (
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => rejectRestaurant(record.key)}
                >
                  Block
                </span>
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => acceptRestaurant(record.key)}
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

  const acceptRestaurant = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://localhost:3008/api/restaurants/admin/update/" + id,
        {
          status: "ACTIVE",
        }
      );
      rerenderTable();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRestaurant = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://localhost:3008/api/restaurants/admin/update/" + id,
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
            <p style={{ margin: 0 }}>
              <span className="font-bold">Address: </span>
              {record.address}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

export default RestaurantsTable;
