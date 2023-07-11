import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { setSearchValue } from "@/features/slices/searchSlice";
import { setFilterValue } from "@/features/slices/filterSlice";
import { DropdownProps, Input, Space } from "antd";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const imgSrc =
    "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  const [selectedItem, setSelectedItem] = useState("");
  const nameParts = localStorage.getItem("userName")?.split(" ");
  const userName = nameParts ? nameParts[nameParts.length - 1] : "";
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSelectedItem("Profile")}
        >
          プロファイル
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSelectedItem("Settings")}
        >
          設定
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSelectedItem("AddFood")}
        >
          料理を追加
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSelectedItem("AddRestaurant")}
        >
          レストランを追加
        </a>
      ),
    },
    {
      key: "5",
      danger: true,
      label: (
        <span onClick={() => handleSelectedItem("Logout")}>ログアウト</span>
      ),
    },
  ];

  const userAvatar = localStorage.getItem("userAvatar");

  const onSearch = (value: string) => {
    dispatch(setSearchValue(value));
    dispatch(setFilterValue("all"));
    if (pathName !== "/home") {
      router.push("/home");
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
    dispatch(setFilterValue("all"));
    if (pathName !== "/home") {
      router.push("/home");
    }
  };

  const handleSelectedItem = (itemKey: string) => {
    setSelectedItem(itemKey);
    switch (itemKey) {
      case "Profile":
        console.log("profile");
        router.push("/user-profile");
        break;
      case "Settings":
        console.log("settings");
        break;

      case "AddFood":
        console.log("add food");
        router.push("/restaurant/add-food");
        break;
      case "AddRestaurant":
        console.log("add restaurant");
        router.push("/restaurant/register");
        break;

      case "Logout":
        {
          localStorage.clear();
          router.push("/login");
        }
        break;
      default:
        // Handle other cases
        break;
    }
  };

    return (
        <div className="flex flex-row space-x-3">
            {
                pathName !== '/login' &&
                (
                    <div className="p-[10px] w-full flex flex-row m-auto justify-between" >
                        <div className="" style={ {padding: "15px"} }>
                        <Link href='/home' className="m-auto text-black" style={{textDecoration: "none"}}>
                            <span className="leading-none text-[30px] text-[#333] " style={{fontSize: "30px", color: "#333"}}>TC</span>
                        </Link>
                        </div>
                        <div>
                        <Search 
                            placeholder="検索" 
                            enterButton 
                            onSearch={onSearch} 
                            onChange={onChange} 
                            className="m-auto"    
                            style={{ minWidth: 300 , paddingTop: "15px", width: "100%"}}
                        />
                        </div>
                        <div className="mr-[30px]">
                        {
                            localStorage.getItem('accessToken') ? (
                                <Dropdown menu={{ items }} placement="bottomRight" arrow className="">
                                    <Space>
                                        <Avatar src={userAvatar} size={50} />
                                        <span>{userName}</span>
                                    </Space>
                                </Dropdown>
                            )
                                : (
                                    <Avatar style={{ cursor: 'pointer' }} size={40} icon={<UserOutlined />}
                                        onClick={() => {
                                            router.push('/login');
                                        }} />
                                )
                        }
                        </div>
                    </div>
                )
            }

        </div>
  );
}