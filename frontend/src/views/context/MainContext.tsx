import React, {createContext, ReactNode, useState} from 'react'

type Props = {
    children?: ReactNode;
}

let initialValue = {
    loading: false,
    setLoading: () => {},
}

const MainContext = createContext<any>(initialValue)

const MainProvider = ({children}: Props) => {
    const [ loading, setLoading ] = useState(initialValue.loading)

    return (
        <>
            <MainContext.Provider value={{setLoading}}>
                {children}
            </MainContext.Provider>

            {loading &&
                <div className="loading">
                    <span className="loader"></span>
                </div>
            }

        </>
    )
}

export {MainContext, MainProvider}