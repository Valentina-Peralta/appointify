
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ContactCard = ({ contact, handleDelete, }) => {


    return (
        <div className='contact_card'>
            <div

                className="contact_info">
                <h3 className=""><PersonIcon style={{ width: '1rem' }} /> {contact.name}</h3>
                <p><PhoneAndroidIcon style={{ width: '1rem' }} /> {contact.number}</p>
                <p ><EmailIcon style={{ width: '1rem' }} /> {contact.email}</p>
            </div>

            <div className='contact_options'>




                <DeleteIcon
                    style={{ color: '#10045c' }}

                    onClick={handleDelete}
                />

            </div>

        </div>
    );
};

export default ContactCard;