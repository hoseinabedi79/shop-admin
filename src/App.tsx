import {
    Admin,
    EditGuesser,
    ListGuesser,
    Resource,
    ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider}>
        <Resource
            name="products"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
        <Resource
            name="categories"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
    </Admin>
);