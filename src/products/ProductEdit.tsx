import {
    DateField,
    Edit,
    Labeled,
    minValue,
    NumberInput,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from "react-admin";
import { PriceInput } from "./PriceInput";

export const ProductEdit = () => (
    <Edit>
        <SimpleForm>
            {/* Read-only info: shown, never sent back to the API */}
            <Labeled label="Id">
                <TextField source="id" />
            </Labeled>
            <TextInput source="name" validate={required()} />
            {/* Required here: an existing product must keep a slug */}
            <TextInput
                source="slug"
                validate={required()}
                helperText="Changing it changes the product's URL"
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
            <Labeled label="Created">
                <DateField source="createdAt" showTime />
            </Labeled>
            <Labeled label="Last updated">
                <DateField source="updatedAt" showTime />
            </Labeled>
        </SimpleForm>
    </Edit>
);