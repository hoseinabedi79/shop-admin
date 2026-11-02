import {
    Create,
    minValue,
    NumberInput,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import { PriceInput } from "./PriceInput";

export const ProductCreate = () => (
    // After saving, go to the edit page of the new product
    <Create redirect="edit">
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput
                source="slug"
                helperText="Optional. Leave empty to build it from the name"
            />
            <PriceInput />
            <NumberInput
                source="stock"
                step={1}
                validate={[required(), minValue(0)]}
            />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput optionText="name" label="Category" validate={required()} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);