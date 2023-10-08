import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderType } from "./Order";
import moment from "moment";
import { UserItemType } from "../Users/Users";



type OrderHistoryItemProps = {
    order: OrderType
    withId?: boolean
}

type OrderItemType = {
    order_id: string;
    menu_id: string;
    menu_label: string;
    quantity: number;
}

export default function OrderHistoryItem({ order, withId }: OrderHistoryItemProps) {
    const [positions, setPositions] = useState<OrderItemType[]>([])
    const [user, setUser] = useState<UserItemType>()

    const update = async () => {
        const list = await window.api.findOrderItems({ order_id: order._id });
        for (const item of list) {
            const menuItem = await window.api.getMenuItem(item.menu_id)
            item['menu_label'] = menuItem.label
        }
        setPositions(list as OrderItemType[]);

        const _user = await window.api.getUser(order.user_id)
        setUser(_user)
    };

    useEffect(() => {
        update()
    }, [order])

    return (

        <TableRow>
            {withId &&
                <TableCell>{order._id}</TableCell>
            }
            <TableCell>{moment(order.createdAt).format('lll')}</TableCell>
            <TableCell>{user?.fio}</TableCell>
            <TableCell>{positions.map(position => (
                <Typography>{position.menu_label} x {position.quantity}</Typography>
            ))}</TableCell>
            <TableCell>{order.sum}</TableCell>
        </TableRow>
    )
}