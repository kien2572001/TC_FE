"use client";
import React, { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";
import Filter from "./Filter";
import { Food } from "@/models/home";

const FoodList = ({ foodsData }: { foodsData: any }) => {
  const [foods, setFoods] = useState<Food[]>(foodsData);

  // useEffect(() => {
  //   const fetchFoods = async () => {
  //     try {
  //       const response = await homeApi.getFoodAll();
  //       setFoods(response);
  //     } catch (error) {
  //       console.error("Failed to fetch foods:", error);
  //     }
  //   };
  //   fetchFoods();
  // }, []);

  if (!foods || foods.length === 0) {
    return <p>No foods found.</p>;
  }

  return (
    <div className="flex overflow-x-scroll">
      {foods.map((food) => (
        <div
          key={food.id}
          className="flex m-auto flex-col border-[1px] border-black border-solid p-[10px] mx-[30px] my-[20px]"
        >
          <div className="flex m-auto w-[150px] h-[170px]">
            <img className="w-full h-full" src={food.photoUrl} alt="food img" />
          </div>
          <div className="flex m-auto flex-col">
            <h2>{food.name}</h2>
            <span className="align-middle items-center">rating</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
