import { minValue, NumberInput, required } from "react-admin";

// The API stores prices in cents (12999), but people type dollars (129.99).
// format runs when showing the value, parse runs when the user types.
export const PriceInput = () => (
    <NumberInput
        source="price"
        label="Price ($)"
        step={0.01}
        format={(cents?: number | null) => (cents == null ? null : cents / 100)}
        // Math.round fixes float errors: 129.99 * 100 is 12998.999999999998
        parse={(dollars: number | null) =>
            dollars == null ? null : Math.round(dollars * 100)
        }
        validate={[required(), minValue(0)]}
    />
);