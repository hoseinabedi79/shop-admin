import {
    DataTable,
    DateField,
    List,
    NumberField,
    ReferenceInput,
    SelectInput,
    TextInput,
} from "react-admin";

// Filters shown above the table: a search box and a category dropdown
const productFilters = [
    <TextInput key="q" source="q" label="Search" alwaysOn />,
    <ReferenceInput
        key="categoryId"
        source="categoryId"
        reference="categories"
        alwaysOn
    >
        <SelectInput optionText="name" label="Category" />
    </ReferenceInput>,
];

export const ProductList = () => (
    // Newest products first
    <List filters={productFilters} sort={{ field: "createdAt", order: "DESC" }}>
        <DataTable rowClick="edit">
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            {/* The API cannot sort by slug, so this header is not clickable */}
            <DataTable.Col source="slug" disableSort />
            {/* Prices are stored in cents, so show them as dollars */}
            <DataTable.Col source="price">
                <NumberField
                    source="price"
                    transform={(cents: number) => cents / 100}
                    options={{ style: "currency", currency: "USD" }}
                />
            </DataTable.Col>
            <DataTable.NumberCol source="stock" />
            {/* The API already sends the category with each product, so no extra request */}
            <DataTable.Col source="category.name" label="Category" disableSort />
            <DataTable.Col source="createdAt" label="Created">
                <DateField source="createdAt" showTime />
            </DataTable.Col>
        </DataTable>
    </List>
);