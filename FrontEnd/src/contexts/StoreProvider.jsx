import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { getUserInfo } from '../apis/authServices'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)

    const accesstoken = Cookies.get('accesstoken')

    useEffect(() => {
        if(accesstoken) {
            getUserInfo(accesstoken).then((response) => {
                setUserInfo(response)
             })
        }
    }, [])

    return (
        <StoreContext.Provider value={{userInfo}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreProvider = () => useContext(StoreContext)