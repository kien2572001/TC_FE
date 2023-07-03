"use client";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import axiosJWT from "@/api/axiosJWT";

const { Search } = Input;
import { TeamOutlined, ShopOutlined, CoffeeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

import RestaurantsTable from "./Table/RestaurantsTable";
import UsersTable from "./Table/UsersTable";
import FoodsTable from "./Table/FoodsTable";
import { useRouter } from "next/navigation";
const items: MenuProps["items"] = [
  {
    label: "Restaurants",
    key: "restaurants",
    icon: <ShopOutlined />,
  },
  {
    label: "Users",
    key: "users",
    icon: <TeamOutlined />,
  },
  {
    label: "Foods",
    key: "foods",
    icon: <CoffeeOutlined />,
  },
];

const AdminPage = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const [current, setCurrent] = useState("restaurants");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    rerenderTable();
  }, [current]);

  const fetch = async () => {
    await getAllByKey();
  };

  const getAllByKey = async () => {
    if (current === "restaurants") {
      const res = await axiosJWT.get(
        "http://localhost:3008/api/restaurants/admin/all"
      );
      console.log(res.data.restaurants);
      let restaurants = res.data.restaurants;
      restaurants = restaurants.map((restaurant: any) => {
        return {
          key: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          link: "http://localhost:3000/restaurant/" + restaurant.id,
          status: restaurant.status,
        };
      });
      setData(sortByStatus(restaurants));
    } else if (current === "foods") {
      const res = await axiosJWT.get(
        "http://localhost:3008/api/foods/admin/all"
      );
      console.log(res.data.foods);
      let foods = res.data.foods;
      foods = foods.map((food: any) => {
        return {
          key: food.id,
          name: food.name,
          price: food.price,
          link: "http://localhost:3000/food/" + food.id,
          description: food.description,
          status: food.status,
          image: food.photoUrl ? food.photoUrl : "",
        };
      });
      setData(sortByStatus(foods));
    } else if (current === "users") {
      const res = await axiosJWT.get(
        "http://localhost:3008/api/user/admin/all"
      );
      console.log(res.data.users);
      let users = res.data.users;
      users = users.map((user: any) => {
        return {
          key: user.id,
          name: user.name,
          email: user.email,
          status: user.status,
          avatar: user.avatar,
        };
      });
      setData(sortByStatus(users));
    }
  };

  const sortByStatus = (data: any[]) => {
    let itemWithActiveStatus = data.filter((item) => item.status === "ACTIVE");
    let itemWithInactiveStatus = data.filter(
      (item) => item.status === "INACTIVE"
    );
    let itemWithBlockedStatus = data.filter(
      (item) => item.status === "BLOCKED"
    );

    return [
      ...itemWithActiveStatus,
      ...itemWithInactiveStatus,
      ...itemWithBlockedStatus,
    ];
  };

  const rerenderTable = () => {
    fetch();
  };

  const onSearch = (value: string) => {
    if (current === "restaurants") {
      searchRestaurant(value);
    } else if (current === "foods") {
      searchFood(value);
    } else if (current === "users") {
      searchUser(value);
    }
  };

  const searchRestaurant = async (value: string) => {
    const res = await axiosJWT.get(
      "http://localhost:3008/api/restaurants/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    console.log(res.data.restaurants);
    let restaurants = res.data.restaurants;
    restaurants = restaurants.map((restaurant: any) => {
      return {
        key: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        link: "http://localhost:3000/restaurant/" + restaurant.id,
        status: restaurant.status,
      };
    });
    setData(sortByStatus(restaurants));
  };

  const searchFood = async (value: string) => {
    const res = await axiosJWT.get(
      "http://localhost:3008/api/foods/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    console.log(res.data.foods);
    let foods = res.data.foods;
    foods = foods.map((food: any) => {
      return {
        key: food.id,
        name: food.name,
        price: food.price,
        link: "http://localhost:3000/food/" + food.id,
        description: food.description,
        status: food.status,
        image: food.photoUrl ? food.photoUrl : "",
      };
    });
    setData(sortByStatus(foods));
  };

  const searchUser = async (value: string) => {
    const res = await axiosJWT.get(
      "http://localhost:3008/api/user/admin/search",
      {
        params: {
          name: value,
        },
      }
    );
    console.log(res.data.users);
    let users = res.data.users;
    users = users.map((user: any) => {
      return {
        key: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        avatar: user.avatar,
      };
    });
    setData(sortByStatus(users));
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
            placeholder="input search text"
            allowClear
            enterButton="Search"
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
              rerenderTable={rerenderTable}
              navigateTo={navigateTo}
            />
          ) : current === "users" ? (
            <UsersTable data={data} rerenderTable={rerenderTable} />
          ) : (
            <FoodsTable
              data={data}
              rerenderTable={rerenderTable}
              navigateTo={navigateTo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
