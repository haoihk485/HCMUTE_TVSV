import { useParams } from "react-router"
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import blankAvt from '../../assets/image/blank_avt.png'
import { useDispatch } from "react-redux";
import { errorMessage, hideLoading, showLoading } from "../../redux/slices/commonSlice";
import { getQuestionDeatailById } from "../../service/public_service/publicQuestionService";
import { useEffect, useState } from "react";
import { dateFormat } from "../../utils/string";
import HomeBanner from "../../components/home_banner/HomeBanner";

const QuestionDetail = () => {
    let { questionId } = useParams()
    const dispatch = useDispatch()
    const [question, setQuestion] = useState(null)

    useEffect(() => {
        getQuestionDetail()
    }, [])

    const getQuestionDetail = async () => {
        dispatch(showLoading())

        try {
            const response = await getQuestionDeatailById(questionId)
            if (response.success) {
                setQuestion(response.data)
            } else {
                dispatch(errorMessage(response?.message ? response.message : 'Lỗi lấy dữ liệu'))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy dữ liệu'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <>
            <HomeBanner />
            {question &&
                <div className="grid">
                    <div className="grid grid-cols-4 w-[65%] mx-auto gap-2 my-3 col-span-3">
                        <div className=" p-1 pl-3 col-span-4 ">
                            <div className="flex items-center text-white bg-dark_blue rounded-md p-1 pl-3">
                                <HomeIcon />
                                <ChevronRightIcon />
                                <p className='inline-block text-lg font-bold'>Hỏi đáp</p>
                            </div>
                            <div className="bg-white p-4 mt-1 rounded-t-md">
                                <h1 className=" text-3xl font-bold text-[#2A2A2A]">{question.title}</h1>
                                <span className="flex gap-2 text-sm items-center content-center text-gray-600">
                                    <p className="font-semibold"><CalendarMonthOutlinedIcon fontSize="small" className="pb-[2px]" />{dateFormat(question.date)}</p>
                                    <p><RemoveRedEyeOutlinedIcon fontSize="small" className="pb-[2px]" /><span className="font-semibold">{question.views}</span> lượt xem</p>
                                    <p><CheckBoxOutlinedIcon fontSize="small" className="pb-[2px]" />Đã được trả lời</p>
                                </span>
                            </div>
                            <div className="bg-white p-4  border-t rounded-b-md text-[#2A2A2A]">
                                <p className="text-md">{question.content}</p>
                            </div>

                            <div className="bg-white p-4 rounded-md mt-1">
                                <h1 className="text-xl font-bold text-[#2A2A2A]">Phản hồi</h1>
                                {
                                    question?.answer ?
                                        <div className="flex flex-row  mb-3">
                                            <img src={(question.answer.user?.avatar) ? question.answer.user.avatar : blankAvt}
                                                alt=""
                                                className="w-12 h-12 rounded-full border-2 border-dark_blue" />
                                            <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A]">
                                                <p className="text-sm mt-2"><span className="text-blue-500 font-semibold">
                                                    {question.answer.user.name}</span> đã trả lời lúc <span className="font-semibold">{dateFormat(question.answer.date)}</span>
                                                </p>
                                                <p className="text-md mt-3" dangerouslySetInnerHTML={{ __html: question.answer.content }}>
                                                </p>
                                            </span>
                                        </div>
                                        :
                                        <div className="flex flex-row  mb-3">
                                            <span className=" bg-[#EFF1F3] ml-2 px-3 rounded-lg w-full text-[#2A2A2A] py-3 text-center">
                                                Chưa có phản hồi
                                            </span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default QuestionDetail