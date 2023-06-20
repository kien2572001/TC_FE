import { Empty, Slider } from "antd";
import React from "react";
import { StarFilled } from "@ant-design/icons";
type MenuProps = {
  menu: any[];
  handleRouterToFoodDetail: (id: number) => void;
};

const Menu = ({ menu, handleRouterToFoodDetail }: MenuProps) => {
  const settings = {
    dots: false, // Hiển thị chấm chỉ số các item
    infinite: true, // Vô hạn lướt qua các item
    speed: 500, // Tốc độ lướt
    slidesToShow: 5, // Số item được hiển thị cùng một lúc
    slidesToScroll: 1, // Số item được lướt qua khi ấn nút
  };
  return (
    <div className="flex pb-5 w-full overflow-x-scroll overflow-y-hidden p-2 ">
      {menu?.map((item) => (
        <div
          className=" relative hover:scale-105 transition-all duration-300 flex-[1_0_230px] max-w-[230px] mx-2"
          key={item.id}
          onClick={() => handleRouterToFoodDetail(item.id)}
        >
          <div className="absolute top-5 left-5 bg-[#FF903F] text-white font-bold text-xs p-2 rounded">
            <StarFilled /> {Number.parseFloat(item.rating).toFixed(1)}
          </div>
          <div className="p-[10px] h-[270px] max-w-[200px] text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden  w-full cursor-pointer rounded-md border border-orange-200 border-solid">
            {/* Nội dung */}
            <div className="h-[170px] w-full overflow-hidden">
              <img src={item.photoUrl} alt="food" className="w-full h-fit" />
            </div>
            <h5 className="font-bold my-2 ">{item.name}</h5>
            <p className="text-[#FF7918] font-bold text-base mt-2">
              {item.price}VND
            </p>
          </div>
        </div>
      ))}
      {menu && menu.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <Empty className="mt-5" description="メニューがありません" />
        </div>
      )}
    </div>
  );
};

export default Menu;
