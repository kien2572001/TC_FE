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
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Email",
      dataIndex: "",
      key: "email",
      render: (record) => (
        <span className="text-blue-500 cursor-pointer">{record.email}</span>
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
                onClick={() => acceptUser(record.key)}
              >
                Accept
              </span>
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => rejectUser(record.key)}
              >
                Reject
              </span>
            </div>
          ) : (
            <>
              {record.status === "ACTIVE" ? (
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => rejectUser(record.key)}
                >
                  Block
                </span>
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => acceptUser(record.key)}
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

  const acceptUser = async (id: number) => {
    try {
      const res = await axiosJWT.put(
        "http://localhost:3008/api/user/admin/update/" + id,
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
        "http://localhost:3008/api/user/admin/update/" + id,
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
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <div style={{ padding: "10px" }}>
        //       <div className="flex space-x-2 h-[100px]">
        //         <div className="h-full">
        //           <img src={record.image} alt="" className="h-full" />
        //         </div>
        //         <div className="h-full ml-4">
        //           <p>
        //             <span className="font-bold">Price: </span> {record.price}{" "}
        //             VND
        //           </p>
        //           <p>
        //             <span className="font-bold">Description: </span>{" "}
        //             {record.description}
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //   ),
        //   rowExpandable: (record) => record.name !== "Not Expandable",
        // }}
        dataSource={data}
      />
    </>
  );
};

export default UsersTable;
