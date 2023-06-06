import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setSearchValue } from '../store';

export default function Header() {

    const dispatch = useDispatch()

    const handleSearch = () => {
        let searchValue = document.getElementById('search-bar') as any;
        dispatch(setSearchValue(searchValue.value));
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let searchValue = document.getElementById('search-bar') as any;
            dispatch(setSearchValue(searchValue.value));
        }
    };


    return (
        <div className="container">
            <div className="navbar bg-base-100 rounded-none">
                <div className="flex-1 ml-20">
                    <Link href={'/'} className="btn btn-ghost normal-case text-xl">TC</Link>
                </div>
                <div className="flex-1 gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="検索.." className="input input-bordered w-24 md:w-auto" id="search-bar" onKeyUp={handleKeyPress} />
                    </div>
                    <button className="btn-search btn btn-ghost btn-circle" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                {
                    localStorage.getItem('accessToken') ? (
                        <div>
                            <div className="dropdown dropdown-end ml-20">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-15 rounded-full">
                                        <img src="https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            プロフィール
                                        </a>
                                    </li>
                                    <li><a>設定</a></li>
                                    <li><a>ログアウト</a></li>
                                </ul>
                            </div>
                            <span style={{ marginLeft: '15px' }}>Ngo Ba Kha</span>
                        </div>
                    ) :
                        (
                            <div></div>
                        )
                }
            </div>
        </div>


    )
}