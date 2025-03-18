

import { Outlet } from 'react-router-dom'
import Sidebar from '../ui/Sidebar'


function PublicLayout() {


    return (
        <div className="flex w-full h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
            <Outlet />
            </div>
        </div>
    )
}

export default PublicLayout
