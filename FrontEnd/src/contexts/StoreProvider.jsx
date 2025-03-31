import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from '../apis/authServices'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)

    const getInfo = (data) => {
        setUserInfo(data)
    }

    const clearInfo = () => {
        setUserInfo(null)
    }

    const token = localStorage.getItem('accesstoken')

    useEffect(() => {
        if(token) {
            getUserInfo(token).then((response) => {
                setUserInfo(response)
             })
        }
    }, [])

    return (
        <StoreContext.Provider value={{userInfo, getInfo, clearInfo}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreProvider = () => useContext(StoreContext)