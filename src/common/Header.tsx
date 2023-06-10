import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { setSearchValue } from "@/features/slices/searchSlice";
import { DropdownProps, Input, Space } from 'antd';
import { Avatar, Dropdown, MenuProps } from 'antd';


const { Search } = Input;


export default function Header() {

    const dispatch = useDispatch()
    const router = useRouter()
    const pathName = usePathname()
    const imgSrc = "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    const [selectedItem, setSelectedItem] = useState('');
    const nameParts = localStorage.getItem('userName')?.split(" ");
    const userName = nameParts ? nameParts[nameParts.length - 1] : ''
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => handleSelectedItem('Profile')}>
                    プロファイル
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => handleSelectedItem('Settings')}>
                    設定
                </a>
            ),
        },
        {
            key: '3',
            danger: true,
            label: (
                <span onClick={() => handleSelectedItem('Logout')}>
                    ログアウト
                </span>
            ),
        },
    ];



    const onSearch = (value: string) => {
        dispatch(setSearchValue(value))
        if (pathName !== '/home') {
            router.push('/home');
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(setSearchValue(value));
        if (pathName !== '/home') {
            router.push('/home');
        }
    };

    const handleSelectedItem = (itemKey: string) => {
        setSelectedItem(itemKey);
        switch (itemKey) {
            case 'Profile':
                console.log('profile')
                break;
            case 'Settings':
                console.log('settings')
                break;
            case 'Logout':
                {
                    localStorage.clear();
                    router.push('/login');
                }
                break;
            default:
                // Handle other cases
                break;
        }
    };

    return (
        <div>
            {
                localStorage.getItem('accessToken') &&
                (
                    <div className="container">
                        <Link href='/home' className="logo">
                            <span className="">TC</span>
                        </Link>
                        <Search placeholder="検索" enterButton onSearch={onSearch} onChange={onChange} className="search-bar" />

                        <Dropdown menu={{ items }} placement="bottomRight" arrow className="dropdown-menu">
                            <Space>
                                <Avatar src={imgSrc} size={50} />
                                <span style={{ marginLeft: 5 }}>{userName}</span>
                            </Space>

                        </Dropdown>
                        <br />
                    </div>
                )
            }

        </div>


    )
}