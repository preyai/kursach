import { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import MenuList from "./MenuList";
import MenuForm from "./MenuForm";

export type MenuItemType = {
    _id: string;
    label: string;
    price: number;
};

type MenuContextType = {
    update: () => Promise<void>
}
export const MenuContext = createContext({} as MenuContextType)

export default function Menu() {
    const [menu, setMenu] = useState<MenuItemType[]>([]);

    const update = async () => {
        const list = await window.api.getAllMenuItems();
        setMenu(list as MenuItemType[]);
    };

    useEffect(() => {
        update();
    }, []);

    const handleAdd = (label: string, price: string) => {
        window.api
            .addMenuItem({ label, price: Number(price) })
            .then(update);
    };

    const handleRemove = (id: string) => {
        window.api.removeMenuItem(id).then(update);
    };

    return (
        <MenuContext.Provider value={{ update }} >
            <MenuList menu={menu} onRemove={handleRemove} editable={true} />
            <MenuForm
                handler={handleAdd}
                buttonText="добавить"
            />
        </MenuContext.Provider>
    );
}