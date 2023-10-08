import { Dialog, DialogContent, DialogTitle, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import ProductForm from "./ProductForm";
import { ProductItemType, ProductsContext } from "./Products";

type ProductItemProps = {
    item: ProductItemType;
    editable?: boolean;
    onRemove?: (id: string) => void;
};

const ProductItem = ({ item, editable, onRemove }: ProductItemProps) => {
    const [open, setOpen] = useState(false);
    const { update } = useContext(ProductsContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = () => {
        if (onRemove)
            onRemove(item._id);
    };

    const handleSave = (label: string, remaining: string) => {
        window.api
            .updateProduct(item._id, { label, remaining: Number(remaining) })
            .then(() => {
                handleClose()
                update()
            })
    };

    return (
        <TableRow key={item._id}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.remaining}</TableCell>
            {editable &&
                <>
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
                            <ProductForm
                                handler={handleSave}
                                label={item.label}
                                price={item.remaining.toString()}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            }
        </TableRow>
    );
};

export default ProductItem;