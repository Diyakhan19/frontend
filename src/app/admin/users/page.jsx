import React from 'react'
import Sidebar from '@/components/admin/Sidebar'
const Users  = () => {
    return(
        <div>
            <Sidebar/>
            <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">Users</div>
        </main>
        </div>
    )
}
export default Users;
