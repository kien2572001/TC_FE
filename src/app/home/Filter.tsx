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
      <Button size="large">全て</Button>
      <Button size="large">食べ物</Button>
      <Button size="large">飲み物</Button>
      <Button size="large">評価</Button>
      <Button size="large">安い</Button>
    </Space>
  );
};

export default Filter;