import { createContext, useState } from 'react';


const contextData = createContext({});
function Context(props) {

    const [formData, setFormData] = useState({});
    return (
        <>
        <contextData.Provider value={{formData, setFormData}}>
        {props.children}
        </contextData.Provider>
        </>
    )
}

export { contextData };
export default Context;