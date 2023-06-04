"use client";
import React, { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import FoodFilter from "./FoodFilter";
import FoodList from "./FoodList";

type Props = {};

const Home = (props: Props) => {
  const [filterValue, setFilterValue] = useState(""); // State for filter value

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <div>
      <div className="flex max-w-[1500px] m-auto p-[10px] flex-col border-[1px] border-black border-solid">
        <h1>Restaurant</h1>
        <RestaurantList />
      </div>
      <div className="flex max-w-[1500px] m-auto p-[10px] flex-col border-[1px] border-black border-solid">
        <div className="flex space-x-5">
          <h1>Recommended Foods</h1>
          <FoodFilter onChange={handleFilterChange} /> {/* Pass the filter change handler */}
        </div>
        <FoodList filter={filterValue} /> {/* Pass the filter value as a prop */}
      </div>
    </div>
  );
};

export default Home;
