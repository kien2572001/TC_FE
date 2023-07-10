"use client";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { setSearchValue } from "@/features/slices/searchSlice";
import { setFilterValue } from "@/features/slices/filterSlice";
import { DropdownProps, Input, Space } from "antd";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";


const { Search } = Input;

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const imgSrc =
    "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  const [selectedItem, setSelectedItem] = useState("");

  useLayoutEffect(() => {
    let tempUserAvatar = localStorage.getItem("userAvatar");
    let tempUserName = localStorage.getItem("userName");
    if (localStorage) {
      setAvatar(tempUserAvatar ? tempUserAvatar : "");
      setName(tempUserName ? tempUserName : "");
      setNameParts(tempUserName ? tempUserName.split(" ") : []);
      setIsClient(true);
    }
  }, []);

  //const nameParts = localStorage.getItem("userName")?.split(" ");
  // const userAvatar = localStorage.getItem("userAvatar");
  // const userName = nameParts ? nameParts[nameParts.length - 1] : "";

  const [nameParts, setNameParts] = useState<string[]>([]);
  const [userAvatar, setAvatar] = useState("");
  const [userName, setName] = useState("");

  const [isClient, setIsClient] = useState(false);

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
          if (typeof window !== undefined) {
            localStorage.clear();
          }
          router.push("/login");
        }
        break;
      default:
        // Handle other cases
        break;
    }
  };


  return (
    <div className="flex flex-row space-x-3" style={{maxHeight: "90px"}}>
      {pathName !== "/login" && (
        <div className="p-[10px] w-full flex flex-row m-auto justify-between">
          <div className="h-full inline-block" style={{marginLeft:"20px"}} >
            <Link
              href="/home"
              style={{ textDecoration: "none", lineHeight: "0", display: "inline-block" }}
            >
              <picture>
                <source srcSet="https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688957507/mbuu43qw2pa3siwft1tw.png?fbclid=IwAR33SwRaiNcXFaunXZDvUr82UBaA5Hdho15HAViRtEW-f1NstGZDDEPjAnk" type="image/webp" />
                <source srcSet="https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688957507/mbuu43qw2pa3siwft1tw.png?fbclid=IwAR33SwRaiNcXFaunXZDvUr82UBaA5Hdho15HAViRtEW-f1NstGZDDEPjAnk" type="image/png" />
                <img
                  src="https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688957507/mbuu43qw2pa3siwft1tw.png?fbclid=IwAR33SwRaiNcXFaunXZDvUr82UBaA5Hdho15HAViRtEW-f1NstGZDDEPjAnk"
                  alt="logo"
                  style={{ width: "45px", height: "auto" }}
                />
              </picture>
            </Link>
          </div>
          <div>
            <Search
              placeholder="検索"
              enterButton
              onSearch={onSearch}
              onChange={onChange}
              className="m-auto"
              style={{ minWidth: 300, paddingTop: "10px", width: "100%" }}
            />
          </div>
          <div className="mr-[30px]">
            {isClient ? (
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow
                className=""
              >
                <Space>
                  <Avatar src={userAvatar} size={50} />
                  <span>{userName}</span>
                </Space>
              </Dropdown>
            ) : (
              <Avatar
                style={{ cursor: "pointer" }}
                size={40}
                icon={<UserOutlined />}
                onClick={() => {
                  router.push("/login");
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
