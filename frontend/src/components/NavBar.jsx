import React from 'react'
import { Link } from 'react-router'
import {PlusIcon} from 'lucide-react'

const NavBar = () => {
  return <header className='bg-base-100 border-b border-base-content/10'> 
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-[#ef9f33] tracking-tight'>NoteZipper</h1>
            <div className='flex items-center gap-4'>
                <Link to={"/create"} className="btn text-[#ef9f34] bg-base-200 rounded-3xl hover:bg-base-100/30">
                    <PlusIcon className='size-5' />
                    <span>New</span>
                </Link>
            </div>
        </div>

    </div>
     </header>
}

export default NavBar
