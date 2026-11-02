import { DataTable, DateField, List } from "react-admin";

export const CategoryList = () => (
    // The API returns every category at once and ignores paging and sorting,
    // so the list has no pagination and no clickable headers
    <List pagination={false}>
        <DataTable rowClick="edit">
            <DataTable.Col source="id" disableSort />
            <DataTable.Col source="name" disableSort />
            <DataTable.Col source="slug" disableSort />
            <DataTable.Col source="description" disableSort />
            <DataTable.Col source="createdAt" label="Created" disableSort>
                <DateField source="createdAt" showTime />
            </DataTable.Col>
        </DataTable>
    </List>
);