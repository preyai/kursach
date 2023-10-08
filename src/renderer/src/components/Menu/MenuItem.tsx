import { Dialog, DialogContent, DialogTitle, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuContext, MenuItemType } from "./Menu";
import { useContext, useState } from "react";
import MenuForm from "./MenuForm";

type MenuItemProps = {
    item: MenuItemType;
    onRemove: (id: string) => void;
};

const MenuItem = ({ item, onRemove }: MenuItemProps) => {
    const [open, setOpen] = useState(false);
    const { update } = useContext(MenuContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = () => {
        onRemove(item._id);
    };

    const handleSave = (label: string, price: string) => {
        window.api
            .updateMenuItem(item._id, { label, price: Number(price) })
            .then(() => {
                handleClose()
                update()
            })
    };

    return (
        <TableRow key={item._id}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleRemove}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{item.label}</DialogTitle>
                <DialogContent>
                    <MenuForm
                        handler={handleSave}
                        label={item.label}
                        price={item.price.toString()}
                    />
                </DialogContent>
            </Dialog>
        </TableRow>
    );
};

export default MenuItem;