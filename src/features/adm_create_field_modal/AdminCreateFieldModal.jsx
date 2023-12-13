import { useDispatch } from "react-redux"
import ModalLayout from "../../components/modal_layout"
import { useState } from "react"

const AdminCreateFieldModal = ({ handleClose, createField }) => {


    const dispatch = useDispatch()

    const initFieldInfo = { name: '' }

    const [fieldInfo, setFieldInfo] = useState(initFieldInfo)

    const handleInputOnchange = async (e) => {
        setFieldInfo({ name: e.target.value })
    }

    const handleCreate = async () => {
        await createField(fieldInfo)
        setFieldInfo({
            name: ''
        })
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Thêm lĩnh vực'}>
            <div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên lĩnh vực</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={fieldInfo.name}
                        onChange={e => handleInputOnchange(e)}
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:border-green-300 duration-500"
                        onClick={() => handleCreate()}>Thêm</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default AdminCreateFieldModal