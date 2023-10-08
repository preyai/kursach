import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

type UserFormProps = {
    handler: (label: string, price: string) => void;
    buttonText?: string;
    fio?: string;
    username?: string;
}
export default function UserForm({ handler, buttonText, fio, username }: UserFormProps) {
    const [newFio, setNewFio] = useState<string>(fio || "");
    const [newUsername, setNewUsername] = useState<string>(username || "");

    const buttonHandler = () => {
        handler(newFio, newUsername)
        setNewFio("")
        setNewUsername("")
    }

    return (
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
            <TextField size="small" label="ФИО" value={newFio} onChange={(e) => setNewFio(e.target.value)} />
            <TextField size="small" label="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
            <Button variant="contained" onClick={buttonHandler}>{buttonText || "сохранить"}</Button>
        </Box>
    );
};