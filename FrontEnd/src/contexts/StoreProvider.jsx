import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
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

    const accesstoken = Cookies.get('accesstoken')

    const fetchUserInfo = () => {
        getUserInfo(accesstoken).then((response) => {
            setUserInfo(response)
         })
    }

    useEffect(() => {
        if(accesstoken) {
            fetchUserInfo()
        }
    }, [])

    return (
        <StoreContext.Provider value={{userInfo, getInfo, clearInfo}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreProvider = () => useContext(StoreContext)