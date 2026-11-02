import {
    DateField,
    Edit,
    Labeled,
    maxLength,
    required,
    SimpleForm,
    TextField,
    TextInput,
} from "react-admin";

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            {/* Read-only info: shown, never sent back to the API */}
            <Labeled label="Id">
                <TextField source="id" />
            </Labeled>
            {/* Same limits as the API's CreateCategoryDto */}
            <TextInput source="name" validate={[required(), maxLength(50)]} />
            <TextInput
                source="slug"
                validate={[required(), maxLength(200)]}
                helperText="Changing it changes the category's URL"
            />
            <TextInput source="description" multiline validate={maxLength(500)} />
            <Labeled label="Created">
                <DateField source="createdAt" showTime />
            </Labeled>
            <Labeled label="Last updated">
                <DateField source="updatedAt" showTime />
            </Labeled>
        </SimpleForm>
    </Edit>
);