import React from "react";
import { Button, Space } from "antd";

type FilterProps = {
  onFilterChange: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleOptionChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <Space wrap>
      <Button size="large">All</Button>
      <Button size="large">Foods</Button>
      <Button size="large">Drinks</Button>
      <Button size="large">Rating</Button>
      <Button size="large">Cheap</Button>
    </Space>
  );
};

export default Filter;