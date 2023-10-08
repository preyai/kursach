import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MenuItem from "./ProductItem";
import { ProductItemType } from "./Products";

type ProductListProps = {
  products: ProductItemType[];
  editable?: boolean;
  onRemove?: (id: string) => void;
};

const ProductsList = ({ products, editable, onRemove }: ProductListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          <TableCell>Остаток</TableCell>
          {editable &&
            <TableCell>Действия</TableCell>
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((item) => (
          <MenuItem key={item._id} item={item} onRemove={onRemove} editable={editable} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsList;