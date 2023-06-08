"use client";
import React, { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import FoodList from "./FoodList";
import { Restaurant, Food } from "@/models/home";
import { SearchOutlined } from "@ant-design/icons";
import Filter from "./Filter";

type Props = {};

const restaurantPhoto: string =
  "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123";
const restaurantsData: any = [
  {
    id: 1,
    name: "Restaurant 1",
    photoUrl: restaurantPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
  {
    id: 2,
    name: "Restaurant 2",
    photoUrl: restaurantPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
  {
    id: 3,
    name: "Restaurant 3",
    photoUrl: restaurantPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
  {
    id: 4,
    name: "Restaurant 4",
    photoUrl: restaurantPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
];

const foodPhoto: string =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80";

const foodsData: any = [
  {
    id: 1,
    name: "Food 1",
    photoUrl: foodPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
  {
    id: 2,
    name: "Food 2",
    photoUrl: foodPhoto,
    active_time: "10:00 - 22:00",
    is_draft: false,
  },
];

const Home = (props: Props) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    const filteredRestaurants: any = restaurantsData.filter(
      (restaurant: any) => {
        restaurant.name.includes(filterValue);
      }
    );
    setRestaurants(filteredRestaurants);
  };

  useEffect(() => {
    console.log("handleFilterChange useEffect", filterValue);
  }, [filterValue]);

  const handleSearch = () => {
    console.log("search");
    const filteredRestaurants: any = restaurantsData.filter((restaurant: any) =>
      restaurant.name.includes(filterValue)
    );
    setRestaurants(filteredRestaurants);
  };

  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);
  const [foods, setFoods] = useState<Food[]>(foodsData);

  useEffect(() => {
    console.log("Home useEffect");
    console.log("data", restaurantsData);
    console.log("data", foodsData);
  }, []);

  return (
    <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
      <div className="flex max-w-[1500px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[400px] space-y-[10px] bg-white">
        <h1 className="leading-none pb-[20px] border-solid border-gray border-0 border-b-[1px]">レストラン</h1>
        <RestaurantList restaurantsData={restaurants} />
      </div>
      <div className="flex max-w-[1500px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[500px] space-y-[10px] bg-white">
        <div className="flex place-content-between border-solid border-gray border-0 border-b-[1px]">
          <h1 className="leading-none">おすすめ料理</h1>
          <Filter
            onFilterChange={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>

        <FoodList foodsData={foods} />
      </div>
    </div>
  );
};

export default Home;
