import { TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserItemType, UsersContext } from "./Users";
import { useContext, useState } from "react";
import UserForm from "./UserForm";

type UserTableItemProps = {
    item: UserItemType,

}

export default function UserTableItem({ item }: UserTableItemProps) {
    const [open, setOpen] = useState(false);
    const { update } = useContext(UsersContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = () => {
        window.api.removeUser(item._id)
            .then(update);
    };

    const handleSave = (fio: string, username: string) => {
        window.api
            .updateUser(item._id, { fio, username })
            .then(() => {
                handleClose()
                update()
            })
    };

    return (
        <TableRow key={item._id}>
            <TableCell>{item.fio}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleRemove}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{item.fio}</DialogTitle>
                <DialogContent>
                    <UserForm
                        handler={handleSave}
                        fio={item.fio}
                        username={item.username}
                    />
                </DialogContent>
            </Dialog>
        </TableRow>
    );
};