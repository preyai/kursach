import { Autocomplete, Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { MenuItemType } from "../Menu/Menu";
import { SyntheticEvent, createContext, useEffect, useState } from "react";
import OrderPosition from "./OrderPosition";
import { UserItemType } from "../Users/Users";
import OrderHistory from "./OrderHistory";
import { v4 } from 'uuid';


export type OrderType = {
    _id: string;
    user_id: string;
    sum: number;
    createdAt: Date;
};

export type PositionType = {
    id: string
    value: MenuItemType | null
    count: number | null
}

export type OrderContextType = {
    positions: PositionType[]
    update: (position: PositionType) => void
}

export const OrderContext = createContext({} as OrderContextType)

export default function Order() {
    const [users, setUsers] = useState<UserItemType[]>([])
    const [positions, setPositions] = useState<PositionType[]>([])
    const [seller, setSeller] = useState<UserItemType | null>(null)
    const [sum, setSum] = useState<number>(0)

    const getNewPosition = (): PositionType => {
        return {
            id: v4(),
            value: null,
            count: null
        }
    }

    const update = (position: PositionType) => {
        const _positions = [...positions]
        const positionIndex = _positions.findIndex(p => p.id === position.id)
        _positions.splice(positionIndex, 1, position)
        setPositions(_positions)
    }

    const handlerSeller = (event: SyntheticEvent, value: UserItemType | null) => {
        setSeller(value)
    }

    const handlerSave = () => {
        if (!seller) {
            alert("Не выбран кассир")
            return
        }
        if (sum === 0) {
            alert("Не выбраны позиции")
            return
        }
        window.api.addOrder({ user_id: seller._id, sum })
            .then(async order => {
                for (const position of positions.filter(p => p.value !== null && p.count && p.count > 0)) {
                    await window.api.addOrderItem({
                        order_id: order._id,
                        menu_id: position.value?._id,
                        quantity: position.count
                    })
                }
                setPositions([])
            })
    }

    useEffect(() => {
        window.api.getAllUsers()
            .then(list =>
                setUsers(list as UserItemType[])
            )
    }, [])

    useEffect(() => {
        setSum(positions.reduce((prev, curr) => prev + ((curr.value?.price || 0) * (curr.count || 0)), 0))
        if (positions.length === 0) {
            setPositions([getNewPosition()])
        }
        else
            if (positions[positions.length - 1].value != null)
                setPositions(prev => [...prev, ...[getNewPosition()]])


    }, [positions])

    return (
        <OrderContext.Provider value={{ positions, update }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateAreas: '"a b" "a c"',
                    gap: 2
                }}
            >
                <Paper sx={{ gridArea: 'a' }}>
                    <Stack spacing={2}>
                        {positions.map((position, index) => (
                            <OrderPosition position={position} key={index} />
                        ))}
                    </Stack>
                    {sum > 0 &&
                        <Typography sx={{ padding: 2 }}>
                            Сумма {sum} руб
                        </Typography>
                    }
                </Paper>

                <Paper sx={{ gridArea: 'b', padding: 2 }}>
                    <Autocomplete
                        size="small"
                        disablePortal
                        getOptionLabel={(option => option.fio)}
                        value={seller || null}
                        options={users}
                        onChange={handlerSeller}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Кассир" />}
                    />
                </Paper>
                <Paper sx={{ gridArea: 'c', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handlerSave}
                    >
                        Оформить
                    </Button>
                </Paper>
            </Box>
            <Paper sx={{ marginTop: 4, padding: 2 }}>
                <Typography variant="h4">История</Typography>

                <OrderHistory withId />
            </Paper>

        </OrderContext.Provider>
    )
}