import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./Menu";

type MenuListProps = {
  menu: MenuItemType[];
  onRemove: (id: string) => void;
};

const MenuList = ({ menu, onRemove }: MenuListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          <TableCell>Цена</TableCell>
          <TableCell>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {menu.map((item) => (
          <MenuItem key={item._id} item={item} onRemove={onRemove} />
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuList;