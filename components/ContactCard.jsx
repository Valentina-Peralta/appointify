"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ContactCard = ({ contact, handleEdit, handleDelete, }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();


    return (
        <div className='contact_card'>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.number}</p>
            <div className='prompt_options'>
                <p className="bold"
                    onClick={handleEdit}
                >
                    Edit
                </p>
                <p className="orange_gradient bold"
                    onClick={handleDelete}
                >
                    Delete
                </p>
            </div>

        </div>
    );
};

export default ContactCard;