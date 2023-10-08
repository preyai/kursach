import { List, ListItem, ListItemButton } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import { Group, Home, MenuBook, PointOfSale, Warehouse } from "@mui/icons-material";

export default function MainMenu() {
    const navigate = useNavigate()
    const menu = [
        {
            label: "Главная",
            path: "/",
            icon: <Home/>
        },
        {
            label: "Меню",
            path: "/menu",
            icon: <MenuBook/>
        },
        {
            label: "Заказы",
            path: "/order",
            icon: <PointOfSale/>
        },
        {
            label: "Персоонал",
            path: "/users",
            icon: <Group/>
        },
        {
            label: "Склад",
            path: "/products",
            icon: <Warehouse/>
        },
    ]
    return (
        <>
            <List>
                {menu.map((item, index) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}