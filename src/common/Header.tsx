import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { setSearchValue } from "@/features/slices/searchSlice";
import { DropdownProps, Input, Space } from 'antd';
import { Avatar, Dropdown, MenuProps } from 'antd';


const { Search } = Input;


export default function Header() {

    const dispatch = useDispatch()
    const router = useRouter()
    const imgSrc = "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    const searchValue = useSelector((state: RootState) => state.search.searchValue);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    settings
                </a>
            ),
        },
        {
            key: '3',
            danger: true,
            label: 'Logout',
        },
    ];

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    }

    const handleMenuClick = (e: any) => {
        if (e.key === 'logout') {
            // Handle logout logic
        }
    };

    const onSearch = (value: string) => {
        dispatch(setSearchValue(value))
        value = ''
    }

    return (
        <div className="container">
            <span className="logo">TC</span>
            <Search placeholder="検索" enterButton onSearch={onSearch} className="search-bar" />

            <Dropdown menu={{ items }} placement="bottomRight" arrow className="dropdown-menu">
                <Space>
                    <Avatar size={32} />
                    <span style={{ marginLeft: 8 }}>Username</span>
                </Space>

            </Dropdown>

        </div>


    )
}