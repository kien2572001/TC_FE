"use client";
import React, { useEffect, useRef, useState } from "react";
import RestaurantList from "./RestaurantList";
import FoodList from "./FoodList";
import { Restaurant, Food } from "@/models/home";
import { SearchOutlined } from "@ant-design/icons";
import Filter from "./Filter";
import homeApi from "@/api/homeApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);
  const [foods, setFoods] = useState<Food[]>(foodsData);
  const keyword = useSelector((state: RootState) => state.search.searchValue);
  const filterValue = useSelector((state: RootState) => state.filter.filterValue)
  const restaurantRef = useRef<Restaurant[]>([]);
  const foodRef = useRef<Food[]>([]);
  const pathName = usePathname();


  useEffect(() => {
    console.log("Home useEffect");
    console.log("data", restaurantsData);
    console.log("data", foodsData);
  }, []);


  useEffect(() => { //search by keyword
    const fetchByKeyword = async () => {
      try {
        const response = await homeApi.searchByKeyword(keyword);
        setRestaurants(response.restaurant);
        setFoods(response.food);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    if (keyword !== '') {
      fetchByKeyword();
    }
    else {
      const fetchRestaurants = async () => {
        try {
          const response = await homeApi.getRestaurantsAll();
          setRestaurants(response.restaurants)
          restaurantRef.current = response.restaurants;
          console.log(restaurantRef.current);
        } catch (error) {
          console.error("Failed to fetch restaurants:", error);
        }
      };
      fetchRestaurants();

      const fetchFoods = async () => {
        try {
          const response = await homeApi.getFoodAll();
          setFoods(response.foods);
          foodRef.current = response.foods;
          console.log(response)
        } catch (error) {
          console.error("Failed to fetch foods:", error);
        }
      };
      fetchFoods();
    }
  }, [keyword, pathName])


  useEffect(() => { //filter foods
    let filteredFoods: Food[] = [];
    switch (filterValue) {
      case 'all': {
        filteredFoods = foodRef.current;
        break;
      }
      case 'food': {
        filteredFoods = foodRef.current.filter(food => food.isFood);
        break;
      }
      case 'drink': {
        filteredFoods = foodRef.current.filter(food => !food.isFood);
        break;
      }
      case 'rating': {
        filteredFoods = foodRef.current.filter(food => food.rating >= 4);
        filteredFoods.sort(function (a, b) {
          return b.rating - a.rating;
        });
        break;
      }
      case 'cheap': {
        filteredFoods = foodRef.current.filter(food => food.price <= 30000);
        filteredFoods.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      }
    }
    setFoods(filteredFoods);
  }, [filterValue]);


  return (
    <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
      <div className="flex max-w-[1200px] 2xl:max-w-[1500px]  m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[445px] min-h-[400px] space-y-[10px] bg-white">
        <h1 className="leading-none pb-[20px] border-solid border-gray border-0 border-b-[1px]">レストラン</h1>
        <RestaurantList restaurantsData={restaurants} />
      </div>
      <div className="flex max-w-[1200px] 2xl:max-w-[1500px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[500px] space-y-[10px] bg-white">
        <div className="flex border-solid border-gray border-0 border-b-[1px]">
          <h1 className="leading-none mr-[10px]">おすすめ料理</h1>
          <Filter
          />
        </div>

        <FoodList foodsData={foods} />
      </div>
    </div>
  );
};

export default Home;