import ChatBody from "../../components/chat_body"
import ChatSidebar from "../../components/chat_sidebar"

const UserMessage = () => {
    return (
        <div className="bg-white w-[80%] mx-auto grid grid-cols-4 shadow-lg rounded-md my-2 overflow-hidden">
            <ChatSidebar />
            <ChatBody />
        </div>
    )
}

export default UserMessage