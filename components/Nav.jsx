"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
    return (
        <nav>
            <Link href="./" className="logo">
                <Image width={30} height={30} src='/assets/logo.png' />
                <p className="bold">Appointify</p>

            </Link>

            {/*Desktop nav */}
            <div className="desktop_nav">
                {session?.user ? (
                    <div className="user_nav">
                        <Link href='/contacts'
                            className="black_btn">
                            Contacts
                        </Link>
                        <Link href='/'
                            className="black_btn">
                            Appointments
                        </Link>
                        <button
                            type="button"
                            className="black_btn"
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                        >
                            Sign Out
                        </button>                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded'
                                alt='profile'
                            /></Link>
                    </div>
                ) : <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="butto"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in
                            </button>
                        ))}

                </>}
            </div>
            <div className="mobile_nav">
                {session?.user ? (
                    <div className="user_nav">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded'
                            alt='profile'
                            onClick={() => { setToggleDropdown((prev) => !prev) }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className="black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in
                            </button>
                        ))}

                </>}
            </div>

        </nav>)
}

export default Nav