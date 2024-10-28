import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 ">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                
        </Link>
        <Link to={`/publish`}>
            <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 mt-2">New</button>
        </Link>

           
    
    </div>
}