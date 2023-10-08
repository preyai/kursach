import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import { OrderContext, OrderType } from "./Order";

interface OrderHistoryProps {
    withId?: boolean
    limit?: number
}

export default function OrderHistory(props: OrderHistoryProps) {
    const [orders, setOrders] = useState<OrderType[]>([])
    const { positions } = useContext(OrderContext)

    const update = async () => {
        const list: OrderType[] = await window.api.getAllOrders();
        list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        if (props.limit)
            list.splice(props.limit)
        setOrders(list);
    };

    useEffect(() => {
        update()
    }, [positions])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {props.withId &&
                        <TableCell>ID</TableCell>
                    }
                    <TableCell>Дата</TableCell>
                    <TableCell>Кассир</TableCell>
                    <TableCell>Позиции</TableCell>
                    <TableCell>Сумма</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders.map(order => (
                    <OrderHistoryItem order={order} key={order._id} withId={props.withId} />
                ))}
            </TableBody>
        </Table>
    )
}