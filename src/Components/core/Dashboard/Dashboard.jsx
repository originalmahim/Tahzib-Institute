import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import Loading from './../../Loading'

const Dashboard = ({darkTheme}) => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);


    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                <Loading />
            </div>
        )
    }
    // Scroll to the top of the page when the component mounts
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    return (
        <div className={!darkTheme ? "dark" : "light"}>
            <div className='sec-background'>
        <div className=' flex mx-auto max-w-[1580px] min-h-[calc(100vh-3.5rem)] relative '>
            <div className='h-auto overflow-auto w-full'>
                <div className=' p-10 '>
                    <Outlet />
                </div>
            </div>
            <Sidebar />

        </div>
            </div>
        </div>
    )
}

export default Dashboard
