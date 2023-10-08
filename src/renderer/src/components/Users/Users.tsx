
import { Box, Button, IconButton, Input, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

export type UserItemType = {
    _id: string,
    fio: string,
    username: string
}

type UsersContextType = {
    update: () => Promise<void>
}
export const UsersContext = createContext({} as UsersContextType)

const Users = () => {
    const [users, setUsers] = useState<UserItemType[]>([]);

    const update = async () => {
        const list = await window.api.getAllUsers();
        setUsers(list as UserItemType[]);
    };

    useEffect(() => {
        update();
    }, []);

    const handleAdd = (fio: string, username: string) => {
        window.api.addUser({ fio, username })
            .then(update);
    };


    return (
        <UsersContext.Provider value={{ update }}>
            <UserTable users={users} />
            <UserForm
                handler={handleAdd}
                buttonText="добавить"
            />
        </UsersContext.Provider>
    );
};

export default Users;