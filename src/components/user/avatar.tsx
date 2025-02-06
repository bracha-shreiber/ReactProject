
import { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { userContext } from "../../App";

export default () => {
    const { user } = useContext(userContext);

    const getInitials = (firstName: string, lastName: string) => {
        return (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();
    };

    return (
        <Avatar
            sx={{
                bgcolor: "red",
                position: 'fixed',
                top: 60,
                left: 16
            }}
        >
            {getInitials(user.firstName ? user.firstName : '', user.lastName ? user.lastName : '')}
        </Avatar>
    );
};
