import { useState } from "react"
import ModalLayout from "../../components/modal_layout"

const DepHeadCreateCounsellor = ({ handleClose, createCoun }) => {

    const [onInteract, setOnInteract] = useState(false)

    const initUserInfor = {
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'counsellor'
    }
    const [userInfor, setUserInfor] = useState(initUserInfor)

    const handleInputChange = (e) => {
        if (!onInteract) setOnInteract(true)
        setUserInfor({
            ...userInfor,
            [e.target.name]: e.target.value
        })
    }

    const handleAddClick = () => {
        if (!onInteract) return
        createCoun(userInfor)
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Thêm tư vấn viên'}>
            <div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên nhân viên</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={e => handleInputChange(e)}
                        value={userInfor.name}
                    />
                </div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 font-roboto">Số điện thoại</label>
                    <input
                        type="text"
                        id='phone'
                        name="phone"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={e => handleInputChange(e)}
                        value={userInfor.phone}
                    />
                </div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 font-roboto">Email</label>
                    <input
                        type="text"
                        id='email'
                        name="email"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={e => handleInputChange(e)}
                        value={userInfor.email}
                    />
                </div>

                <div className="mb-4 font-roboto">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 font-roboto">Mật khẩu</label>
                    <input
                        type="password"
                        id='password'
                        name="password"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={e => handleInputChange(e)}
                        value={userInfor.password}
                    />
                </div>
                <div className='flex w-full justify-end'>

                    {
                        onInteract &&
                        <div className="flex items-center justify-end mr-3">
                            <button className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:border-green-300 duration-500`}
                                onClick={() => {
                                    setUserInfor(initUserInfor)
                                    setOnInteract(false)
                                }}>Hủy</button>
                        </div>
                    }
                    <div className="flex items-center justify-end">
                        <button className={`px-4 py-2 ${onInteract ? 'bg-green-600 hover:bg-green-500 focus:border-green-300' : 'bg-gray-400 cursor-default'} text-white rounded-md  focus:outline-none focus:ring duration-500`}
                            onClick={() => handleAddClick()}>Thêm</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default DepHeadCreateCounsellor