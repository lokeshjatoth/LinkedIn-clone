import { Link } from "react-router-dom"


const UserCard = ({user, isConnection}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md">
        <Link to={`/profile/${user.username}`} className="flex flex-col items-center">
            <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4" 
            />
            <h3 className="text-lg font-semibold text-center">{user.name}</h3>
        </Link>
        <p className="text-gray-600 text-center">{user.headline}</p>
        <p className="text-gray-500 text-sm mt-2">{user.connections?.length} connections</p>
        <button className="px-4 py-2 rounded-md hover:bg-primary-dark bg-primary text-white mt-4 w-full transition-colors">
            {isConnection ? "connected" : "connect"}
        </button>
    </div>
  )
}

export default UserCard