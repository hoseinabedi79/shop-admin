import {
    Create,
    maxLength,
    required,
    SimpleForm,
    TextInput,
} from "react-admin";

export const CategoryCreate = () => (
    // After saving, go to the edit page of the new category
    <Create redirect="edit">
        <SimpleForm>
            {/* Same limits as the API's CreateCategoryDto */}
            <TextInput source="name" validate={[required(), maxLength(50)]} />
            <TextInput
                source="slug"
                validate={maxLength(200)}
                helperText="Optional. Leave empty to build it from the name"
            />
            <TextInput source="description" multiline validate={maxLength(500)} />
        </SimpleForm>
    </Create>
);