import blankAvt from '../../assets/image/blank_avt.png'

const ChatSidebar = () => {
    return (
        <div className="border-r border-[#3e3c6f] bg-[#3A3F4B] text-white h-[90vh] flex flex-col">
            <div className="flex items-center px-4 py-3 border-b">
                <input type="text" className="w-full rounded-md py-1 px-2 outline-none bg-[#5C6269]" placeholder="Tìm kiếm ..." />
            </div>
            <div className="overflow-y-auto">
                <div className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'>
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>Nhân viên 1</p>
                        <p className='text-xs font-light'>Alo</p>
                    </div>
                </div>
                {/* UI */}
                <div className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'>
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>Nhân viên 1</p>
                        <p className='text-xs font-light'>Alo</p>
                    </div>
                </div>
                <div className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'>
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>Nhân viên 1</p>
                        <p className='text-xs font-light'>Alo</p>
                    </div>
                </div>
                <div className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'>
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>Nhân viên 1</p>
                        <p className='text-xs font-light'>Alo</p>
                    </div>
                </div>
                <div className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'>
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>Nhân viên 1</p>
                        <p className='text-xs font-light'>Alo</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSidebar