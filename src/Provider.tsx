import { Navigate, Outlet } from "react-router-dom"



const Provider = ({ children }: any) => {
    const getUser = localStorage.getItem('user')
    const { user } = getUser ? JSON.parse(getUser) : null
    if (user.id !== 1) {
        alert('Ban khong phai admin')
        return <Navigate to={`/signin`} />
    } else {
        return children ? children : <Outlet />
    }
}

export default Provider