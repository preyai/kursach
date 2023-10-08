import { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProductsList from "./ProductsList";
import ProductForm from "./ProductForm";


export type ProductItemType = {
    _id: string;
    label: string;
    remaining: number;
};

type ProductsContextType = {
    update: () => Promise<void>
}
export const ProductsContext = createContext({} as ProductsContextType)

export default function Products() {
    const [products, setProducts] = useState<ProductItemType[]>([]);

    const update = async () => {
        const list = await window.api.getAllProducts();
        setProducts(list as ProductItemType[]);
    };

    useEffect(() => {
        update();
    }, []);

    const handleAdd = (label: string, remaining: string) => {
        window.api
            .addProduct({ label, remaining: Number(remaining) })
            .then(update);
    };

    const handleRemove = (id: string) => {
        window.api.removeMenuItem(id).then(update);
    };

    return (
        <ProductsContext.Provider value={{ update }} >
            <ProductsList products={products} onRemove={handleRemove} editable={true} />
            <ProductForm
                handler={handleAdd}
                buttonText="добавить"
            />
        </ProductsContext.Provider>
    );
}