
import bg from '../../assets/image/blank_avt.png'
import { increaseView } from '../../service/counsellor_service/counsellorQuestionService';
import { dateFormat } from '../../utils/string';
import { useNavigate } from 'react-router-dom';

const QuestionBox = ({ question, handleQuestionClick }) => {


    return (
        question && <div className='border-b-2 border-gray-200 my-1 p-3 flex px-4'>
            <div className={`mr-3 flex flex-col justify-center items-center p-2 border ${(question.status === 1) ? 'border-green-500 ' : 'border-red-500 cursor-default'} hover:bg-gray-400 hover:text-white cursor-pointer hover:border-none rounded-lg text-[#848F95] font-semibold w-[70px] h-[80px] text-sm  duration-500`}
                onClick={() => {
                    // if (question.status === 0) return
                    handleQuestionClick(question.questionId)
                }}>
                <p>{question.status === 1 ? '1' : '0'}</p>
                <p>Trả lời</p>
                {/* <p className='flex items-center'>125<RemoveRedEyeOutlinedIcon fontSize='small' className='ml-[2px] text-xs'/></p> */}
            </div>
            <div className='cursor-default'>
                <h1 className='font-bold text-lg'>{question.title}</h1>
                <span className='text-xs items-center'>
                    <p className=' w-fit text-[#2A2A2A] py-[2px] px-1 border bg-[#E7E3B3] border-[#CEC995] rounded-md text-xs my-1'>{question.departmentName}</p>
                </span>
                <span className='flex items-center text-xs'>
                    <img src={bg} alt="user avatar" className='w-6 inline-block rounded-full border border-[#2A2A2A] ' />
                    <p className='inline-block ml-1'><span className='text-blue-400'>{question.name}</span> đã hỏi vào <span className='text-blue-500'>{dateFormat(question.date)}</span></p>
                </span>
            </div>
        </div>
    )
}

export default QuestionBox