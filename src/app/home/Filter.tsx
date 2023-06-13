import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "@/features/slices/filterSlice";
import { RootState } from "@/store";


const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const filterValue = useSelector((state: RootState) => state.filter.filterValue);

  const handleOptionChange = (value: string) => {
    dispatch(setFilterValue(value)); // Dispatch the action with the value
  };

  const handleButtonClick = (index: number, value: string) => {
    if (activeButton === index) {
      // Button is already active, deactivate it
      setActiveButton(null);
    } else {
      // Button is inactive, activate it
      setActiveButton(index);
      handleOptionChange(value); // Call the handleOptionChange function
    }
  };

  useEffect(() => {
    if (filterValue === 'all') {
      setActiveButton(0)
    }
  }, [filterValue])

  return (
    <Space wrap>
      <Button
        size="large"
        onClick={() => handleButtonClick(0, "all")} // Pass the value as "all"
        type={activeButton === 0 ? "primary" : "default"}
      >
        全て
      </Button>
      <Button
        size="large"
        value={"food"}
        onClick={() => handleButtonClick(1, "food")} // Pass the value as "food"
        type={activeButton === 1 ? "primary" : "default"}
      >
        食べ物
      </Button>
      <Button
        size="large"
        value={"drink"}
        onClick={() => handleButtonClick(2, "drink")} // Pass the value as "drink"
        type={activeButton === 2 ? "primary" : "default"}
      >
        飲み物
      </Button>
      <Button
        size="large"
        value={"rating"}
        onClick={() => handleButtonClick(3, "rating")} // Pass the value as "rating"
        type={activeButton === 3 ? "primary" : "default"}
      >
        評価
      </Button>
      <Button
        size="large"
        value={"cheap"}
        onClick={() => handleButtonClick(4, "cheap")} // Pass the value as "cheap"
        type={activeButton === 4 ? "primary" : "default"}
      >
        安い
      </Button>
    </Space>
  );
};

export default Filter;
