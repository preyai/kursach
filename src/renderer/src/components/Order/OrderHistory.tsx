import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import { OrderContext, OrderType } from "./Order";


export default function OrderHistory() {
    const [orders, setOrders] = useState<OrderType[]>([])
    const { positions } = useContext(OrderContext)

    const update = async () => {
        const list = await window.api.getAllOrders();
        setOrders(list as OrderType[]);
    };

    useEffect(() => {
        update()
    }, [positions])

    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h4">История</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Кассир</TableCell>
                        <TableCell>Позиции</TableCell>
                        <TableCell>Сумма</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime()).map(order => (
                        <OrderHistoryItem order={order} key={order._id} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}