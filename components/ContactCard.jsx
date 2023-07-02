"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ContactCard = ({ contact, handleEdit, handleDelete, }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [displayOptions, setDisplayOptions] = useState(false)


    return (
        <div className='contact_card'>
            <div
                onClick={() => { setDisplayOptions(!displayOptions) }
                }
                className="contact_info">
                <h3 className=""><PersonIcon style={{ width: '1rem' }} /> {contact.name}</h3>
                <p><PhoneAndroidIcon style={{ width: '1rem' }} /> {contact.number}</p>
                <p ><EmailIcon style={{ width: '1rem' }} /> {contact.email}</p>
            </div>
            {displayOptions &&
                <div className='contact_options'>

                    <EditIcon
                        onClick={handleEdit}
                    />


                    <DeleteIcon
                        onClick={handleDelete}
                    />

                </div>}

        </div>
    );
};

export default ContactCard;