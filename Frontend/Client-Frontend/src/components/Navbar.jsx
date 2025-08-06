import {Link} from 'react-router-dom'


function Navbar({}){
    return(
        <header className="flex justify-between items-center my-7">
            <Link to ="/">
                <h1>Task App</h1>
            </Link>
        

            <Link
            to = "/tasks/new"
            className='bg-zinc-950 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'>
                Create Task </Link>
        </header>
    )
}


export default Navbar;