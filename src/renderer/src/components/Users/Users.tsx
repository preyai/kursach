import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Input, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export type UserItemType = {
    _id: string,
    fio: string,
    username: string
}

export default function Users() {
    const [users, setUsers] = useState<UserItemType[]>()
    const [newFio, setNewFio] = useState<string>("")
    const [newUsername, setNewUsername] = useState<string>("")

    const update = async () => {
        const list = await window.api.getAllUsers()
        setUsers(list as UserItemType[])
    }


    useEffect(() => {
        update()
    }, [])

    const handlerAdd = () => {
        window.api.addUser({ fio: newFio, username: newUsername })
            .then(update)
    }

    const handlerRemove = (id: string) => {
        window.api.removeUser(id)
            .then(update)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Фио
                        </TableCell>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            Действия
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>{item.fio}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handlerRemove(item._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    marginTop: 2,
                    display: "flex",
                    gap: 2
                }}
            >
                <TextField size="small" label="ФИО" value={newFio} onChange={e => setNewFio(e.target.value)} />
                <TextField size="small" label="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                <Button variant="contained" onClick={handlerAdd}>добавить</Button>
            </Box>
        </>
    )
}