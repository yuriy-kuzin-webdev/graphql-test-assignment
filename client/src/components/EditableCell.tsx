import { useState } from "react";

interface EditableCellProps {
    item: any;
    value: string;
    onChange: (id: string, key: string, newValue: string) => void;
    field: string;
}

const EditableCell: React.FC<EditableCellProps> = ({ item, value, onChange, field }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.target.value);
    };

    const handleBlurOrEnter = () => {
        onChange(item._id, field, tempValue);
        setIsEdit(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleBlurOrEnter();
        } else if (e.key === "Escape") {
            setTempValue(value);
            setIsEdit(false);
        }
    };

    return (
        <td
            className="py-2 px-4 cursor-pointer"
            onClick={() => setIsEdit(true)}
        >
            {isEdit ? (
                <input
                    type="text"
                    value={tempValue}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="px-2 py-1 border border-gray-300 rounded w-full"
                />
            ) : (
                value
            )}
        </td>
    );
};

export default EditableCell;
