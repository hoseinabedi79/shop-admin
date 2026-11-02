import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { CategoryCreate } from "./categories/CategoryCreate";
import { CategoryEdit } from "./categories/CategoryEdit";
import { CategoryList } from "./categories/CategoryList";
import { ProductCreate } from "./products/ProductCreate";
import { ProductEdit } from "./products/ProductEdit";
import { ProductList } from "./products/ProductList";

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider}>
        <Resource
            name="products"
            list={ProductList}
            edit={ProductEdit}
            create={ProductCreate}
        />
        <Resource
            name="categories"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
        />
    </Admin>
);