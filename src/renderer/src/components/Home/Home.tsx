import { electronAPI } from "@electron-toolkit/preload";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import MenuList from "../Menu/MenuList";
import { useEffect, useState } from "react";
import { MenuItemType } from "../Menu/Menu";
import { ProductItemType } from "../Products/Products";
import ProductsList from "../Products/ProductsList";
import OrderHistory from "../Order/OrderHistory";


export default function Home() {
    const [menu, setMenu] = useState<MenuItemType[]>([])
    const [products, setProducts] = useState<ProductItemType[]>([]);

    useEffect(() => {
        window.api.getAllMenuItems()
            .then(list => setMenu(list))

        window.api.findProducts({ remaining: { $lt: 5 } })
            .then(list => setProducts(list))
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h6">Последние чеки</Typography>
                    <OrderHistory limit={10} />
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Stack spacing={2} >
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">Текущее меню</Typography>
                        <MenuList menu={menu} />
                    </Paper>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">Скоро закончатся</Typography>
                        <ProductsList products={products} />
                    </Paper>
                </Stack>
            </Grid>

        </Grid>
    )
}