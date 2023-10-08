import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type MenuFormProps = {
    handler: (label: string, price: string) => void;
    buttonText?: string;
    label?: string;
    price?: string;
};

const MenuForm = ({
    handler,
    buttonText,
    label,
    price
}: MenuFormProps) => {
    const [newLabel, setNewLabel] = useState<string>(label || "");
    const [newPrice, setNewPrice] = useState<string>(price || "");

    const buttonHandler = () => {
        handler(newLabel, newPrice)
        setNewLabel("")
        setNewPrice("")
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                marginTop: 2,
                display: "flex",
                gap: 2,
            }}
        >
            <TextField
                size="small"
                label="название"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
            />
            <TextField
                size="small"
                label="цена"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
            />
            <Button variant="contained" onClick={buttonHandler}>
                {buttonText || "сохранить"}
            </Button>
        </Box>
    );
};

export default MenuForm;