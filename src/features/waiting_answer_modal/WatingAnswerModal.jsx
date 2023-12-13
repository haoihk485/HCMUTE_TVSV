import { useDispatch, useSelector } from "react-redux"
import ModalLayout from "../../components/modal_layout"
import { depHInteractingAnswer } from "../../redux/selectors/depHeadSelector"
import { hideLoading, showLoading } from "../../redux/slices/commonSlice"
import { acceptAnswer, getWaitingAnswerById } from "../../service/dephead_service/depAnswerService"
import { useEffect, useState } from "react"
import blankAvt from '../../assets/image/blank_avt.png'
import { dateFormat } from "../../utils/string"

const WatingAnswerModal = ({ handleClose, handleAcceptAnswer }) => {
    const dispatch = useDispatch()

    const answerId = useSelector(depHInteractingAnswer)

    const [answerData, setAnswerData] = useState({})

    useEffect(() => {
        getAnswer()
    }, [answerId])

    const getAnswer = async () => {
        dispatch(showLoading())

        try {
            const response = await getWaitingAnswerById(answerId)
            if (response.success) {
                setAnswerData(response.data)
            } else {
                dispatch(error(response?.message ? response.message : 'Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(error(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }



    return (
        <ModalLayout handleClose={handleClose} title={'Duyệt câu trả lời'}>
            <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border duration-500">
                <p className="font-bold text-lg">{answerData.title}</p>
                <p className="border border-[#DBD6A4] inline-block bg-[#E7E3B3] p-[2px] rounded-md text-xs">{answerData.fieldName}</p>
                <div className="border-2 rounded-md mt-3 p-1 max-w-[700px]" dangerouslySetInnerHTML={{ __html: answerData.content }}></div>
            </div>
            <div className="mx-auto bg-white px-4 py-2 rounded-md shadow-md border duration-500 mt-1">
                <div className="flex flex-row  my-3">
                    <img src={(answerData.counsellor?.avatar) ? answerData.counsellor.avatar : blankAvt}
                        alt=""
                        className="w-12 h-12 rounded-full border-2 border-dark_blue" />
                    <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A]">
                        <p className="text-sm mt-2"><span className="text-blue-500 font-semibold">
                            {answerData.counsellor?.name}</span> đã trả lời lúc <span className="font-semibold">{dateFormat(answerData.answer?.date)}</span>
                        </p>
                        <p className="text-md mt-3" dangerouslySetInnerHTML={{ __html: answerData.answer?.content }}>
                        </p>
                    </span>
                </div>
            </div>
            <div className="flex justify-around gap-1 mt-3">
                <button className={`px-4 py-2 min-w-[100px] bg-red-600 hover:bg-red-500 focus:border-red-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                    onClick={() => { }}>Không duyệt</button>
                <button className={`px-4 py-2 min-w-[100px] bg-green-600 hover:bg-green-500 focus:border-green-300 text-white rounded-md  focus:outline-none focus:ring duration-500`}
                    onClick={() => handleAcceptAnswer(answerData.answer.id)}>Duyệt</button>
            </div>

        </ModalLayout>
    )
}

export default WatingAnswerModal