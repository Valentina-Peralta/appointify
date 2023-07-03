"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Nav = () => {
    const { data: session } = useSession();
    const [navigation, setNavigation] = useState('appointments')
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        session && localStorage.setItem('userId', session.user.id);
    }, [session])
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);

        })();
    }, []);

    return (
        <nav>
            <Link href="/" className="logo"
                onClick={() => setNavigation('appointments')}

            >
                <Image width={50} height={50} src='/assets/A.png' alt="logo" />
                <p className="bold">Appointify</p>

            </Link>

            {/*Desktop nav */}
            <div className="desktop_nav">
                {session?.user ? (
                    <div className="user_nav">
                        <div className="btns_wrapper">

                            <Link href='/'
                            >
                                <button
                                    onClick={() => setNavigation('appointments')}

                                    className={navigation === 'appointments' ? "orange_btn" : "outline_btn"}>
                                    <CalendarMonthIcon />                                </button>
                            </Link>
                            <Link href='/contacts' >
                                <button
                                    onClick={() => setNavigation('contacts')}
                                    className={navigation === 'contacts' ? "orange_btn" : "outline_btn"}>
                                    <PeopleAltIcon />                                </button>
                            </Link>
                        </div>


                        <button className="outline_btn">
                            <LogoutIcon
                                onClick={() => {
                                    setToggleDropdown(false);
                                    localStorage.removeItem('userId')
                                    signOut();
                                }}
                            /></button>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded'
                            alt='profile'
                        />
                    </div>
                ) : <>
                    {providers &&
                        Object.values(providers).map((provider) => (

                            <LoginIcon
                                key={provider.name}
                                onClick={() => {

                                    signIn(provider.id)

                                }}
                            />
                        ))}

                </>}
            </div>

        </nav>)
}

export default Nav