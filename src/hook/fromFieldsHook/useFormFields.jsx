import { useState } from "react";


const useFormFields = (initialState) => {
    const [input,setInputs]=useState(initialState);

    // handle input change
    const handleInputChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };

        // form reset
        const resetForm = () => {
            setInputs(initialState);
        };
    return {input,handleInputChange,resetForm}
};

export default useFormFields;