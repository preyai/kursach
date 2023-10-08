import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { UserItemType } from "./Users";
import UserTableItem from "./UserTableItem";

type UserTableProps = {
    users: UserItemType[],
}

export default function UserTable({ users }: UserTableProps) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Фио</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Действия</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(item => (
                    <UserTableItem item={item} key={item._id} />
                ))}
            </TableBody>
        </Table>
    );
};