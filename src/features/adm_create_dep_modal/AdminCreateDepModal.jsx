import { useState } from 'react'
import ModalLayout from '../../components/modal_layout'
import { useDispatch } from 'react-redux'
import { errorMessage } from '../../redux/slices/commonSlice'

const AdminCreateDepModal = ({ handleClose, handleCreateDep }) => {
    const dispatch = useDispatch()

    const initDepInfor = {
        name: '', description: ''
    }

    const [depInfor, setDepInfor] = useState(initDepInfor)

    const onInputChange = (e) => {
        setDepInfor({
            ...depInfor,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateClick = () => {
        if (depInfor.name === '' || depInfor.description === '') {
            dispatch(errorMessage('Tên và miêu tả phòng ban không được để trống'))
            return
        }
        handleCreateDep(depInfor)
        setDepInfor(initDepInfor)
    }

    return (
        <>
            <ModalLayout handleClose={handleClose} title={'Thêm phòng ban'}>
                <div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên phòng ban</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={depInfor.name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Mô tả</label>
                        <input
                            type="text"
                            id='description'
                            name="description"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={depInfor.description}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button className="px-4 py-2 duration-500 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={() => handleCreateClick()}>Thêm</button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}
export default AdminCreateDepModal