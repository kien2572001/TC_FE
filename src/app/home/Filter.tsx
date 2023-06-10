import React, { useState } from "react";
import { Button, Space } from "antd";

type FilterProps = {
  onFilterChange: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleOptionChange = (value: string) => {
    onFilterChange(value);
  };

  const handleButtonClick = (index: number) => {
    if (activeButton === index) {
      // Button is already active, deactivate it
      setActiveButton(null);
    } else {
      // Button is inactive, activate it
      setActiveButton(index);
    }
  };

  return (
    <Space wrap>
      <Button
        size="large"
        onClick={() => handleButtonClick(0)}
        type={activeButton === 0 ? "primary" : "default"}
      >
        全て
      </Button>
      <Button
        size="large"
        value={"food"}
        onClick={() => handleButtonClick(1)}
        type={activeButton === 1 ? "primary" : "default"}
      >
        食べ物
      </Button>
      <Button
        size="large"
        value={"drink"}
        onClick={() => handleButtonClick(2)}
        type={activeButton === 2 ? "primary" : "default"}
      >
        飲み物
      </Button>
      <Button
        size="large"
        value={"rating"}
        onClick={() => handleButtonClick(3)}
        type={activeButton === 3 ? "primary" : "default"}
      >
        評価
      </Button>
      <Button
        size="large"
        value={"cheap"}
        onClick={() => handleButtonClick(4)}
        type={activeButton === 4 ? "primary" : "default"}
      >
        安い
      </Button>
    </Space>
  );
};

export default Filter;
