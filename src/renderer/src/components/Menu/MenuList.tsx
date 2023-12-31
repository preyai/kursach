import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./Menu";

type MenuListProps = {
  menu: MenuItemType[];
  editable?: boolean;
  onRemove?: (id: string) => void;
};

const MenuList = ({ menu, editable, onRemove }: MenuListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          <TableCell>Цена</TableCell>
          {editable &&
            <TableCell>Действия</TableCell>
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {menu.map((item) => (
          <MenuItem key={item._id} item={item} onRemove={onRemove} editable={editable} />
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuList;