import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { MenuItemType } from "../Menu/Menu";
import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import { OrderContext, PositionType } from "./Order";

interface OrderPositionProps {
    position: PositionType
}

export default function OrderPosition({ position }: OrderPositionProps) {
    const [menu, setMenu] = useState<MenuItemType[]>([]);

    const { positions, update } = useContext(OrderContext)

    const menuFilter = (m: MenuItemType) => {
        const r = positions.findIndex(p => p.value?._id === m._id)
        if (r === -1)
            return true
        else
            return false
    }

    const updateMenu = async () => {
        const list = await window.api.getAllMenuItems();
        setMenu(list as MenuItemType[]);
    };

    const handlerPosition = (event: SyntheticEvent, value: MenuItemType | null) => {
        console.log(value);

        update({
            id: position.id,
            value,
            count: position.count
        })
    }

    const handlerCount = (event: ChangeEvent<HTMLInputElement>) => {
        update({
            id: position.id,
            value: position.value,
            count: Number(event.target.value)
        })
    }

    useEffect(() => {
        updateMenu();
    }, []);

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Autocomplete
                    size="small"
                    onChange={handlerPosition}
                    value={position.value || null}
                    disablePortal
                    options={menu.filter(menuFilter)}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Позиция" />}
                />

            </Grid>
            <Grid item>
                <TextField
                    size="small"

                    value={position.count || ""}
                    onChange={handlerCount}
                    type="number"
                    label="количество"
                    sx={{ width: 150 }}
                />
            </Grid>
            {(position.value && position.count) ?
                <Grid item>
                    <Typography sx={{ paddingRight: 2 }}>{position.value.price * position.count} руб</Typography>
                </Grid>
                : <></>
            }
        </Grid>
    )
}