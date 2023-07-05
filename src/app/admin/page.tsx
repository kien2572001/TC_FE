"use client";
import React, { useEffect, useState } from "react";
import { Input, Menu } from "antd";
import axiosJWT from "@/api/axiosJWT";
import { useRouter } from "next/navigation";
import { TeamOutlined, ShopOutlined, CoffeeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import RestaurantsTable from "./Table/RestaurantsTable";
import UsersTable from "./Table/UsersTable";
import FoodsTable from "./Table/FoodsTable";

const { Search } = Input;
const items: MenuProps["items"] = [
  {
    label: "レストラン",
    key: "restaurants",
    icon: <ShopOutlined />,
  },
  {
    label: "ユーザー",
    key: "users",
    icon: <TeamOutlined />,
  },
  {
    label: "料理",
    key: "foods",
    icon: <CoffeeOutlined />,
  },
];

const AdminPage = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const [current, setCurrent] = useState("restaurants");

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = async () => {
    if (current === "restaurants") {
      const res = await getRestaurants();
      setData(sortDataByStatus(res));
    } else if (current === "foods") {
      const res = await getFoods();
      setData(sortDataByStatus(res));
    } else if (current === "users") {
      const res = await getUsers();
      setData(sortDataByStatus(res));
    }
  };

  const getRestaurants = async () => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/restaurants/admin/all"
    );
    return res.data.restaurants.map((restaurant: any) => ({
      key: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      link: "http://localhost:3000/restaurant/" + restaurant.id,
      status: restaurant.status,
    }));
  };

  const getFoods = async () => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/foods/admin/all"
    );
    return res.data.foods.map((food: any) => ({
      key: food.id,
      name: food.name,
      price: food.price,
      link: "http://localhost:3000/food/" + food.id,
      description: food.description,
      status: food.status,
      image: food.photoUrl ? food.photoUrl : "",
    }));
  };

  const getUsers = async () => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/user/admin/all"
    );
    return res.data.users.map((user: any) => ({
      key: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      avatar: user.avatar,
    }));
  };

  const sortDataByStatus = (data: any[]) => {
    const sortByStatus = (status: string) =>
      data.filter((item) => item.status === status);
    const itemWithInactiveStatus = sortByStatus("INACTIVE");
    const itemWithActiveStatus = sortByStatus("ACTIVE");
    const itemWithBlockedStatus = sortByStatus("BLOCKED");

    return [
      ...itemWithInactiveStatus,
      ...itemWithActiveStatus,
      ...itemWithBlockedStatus,
    ];
  };

  const onSearch = async (value: string) => {
    if (current === "restaurants") {
      const res = await searchRestaurant(value);
      setData(sortDataByStatus(res));
    } else if (current === "foods") {
      const res = await searchFood(value);
      setData(sortDataByStatus(res));
    } else if (current === "users") {
      const res = await searchUser(value);
      setData(sortDataByStatus(res));
    }
  };

  const searchRestaurant = async (value: string) => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/restaurants/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    return res.data.restaurants.map((restaurant: any) => ({
      key: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      link: "http://localhost:3000/restaurant/" + restaurant.id,
      status: restaurant.status,
    }));
  };

  const searchFood = async (value: string) => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/foods/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    return res.data.foods.map((food: any) => ({
      key: food.id,
      name: food.name,
      price: food.price,
      link: "http://localhost:3000/food/" + food.id,
      description: food.description,
      status: food.status,
      image: food.photoUrl ? food.photoUrl : "",
    }));
  };

  const searchUser = async (value: string) => {
    const res = await axiosJWT.get(
      "http://13.212.172.169:3008/api/user/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    return res.data.users.map((user: any) => ({
      key: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      avatar: user.avatar,
    }));
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex w-[1200px] flex-col">
        <div className="w-[1200px] flex flex-col">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <Search
            placeholder="検索したいレストラン名を入力する"
            allowClear
            enterButton="検索"
            size="large"
            onSearch={onSearch}
            style={{
              marginTop: "15px",
            }}
          />
        </div>
        <div className="w-[1200px] mt-4">
          {current === "restaurants" ? (
            <RestaurantsTable
              data={data}
              rerenderTable={fetchData}
              navigateTo={navigateTo}
            />
          ) : current === "users" ? (
            <UsersTable data={data} rerenderTable={fetchData} />
          ) : (
            <FoodsTable
              data={data}
              rerenderTable={fetchData}
              navigateTo={navigateTo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;