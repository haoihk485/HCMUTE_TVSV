const Switch = ({ active, oC, id }) => {
    return (
        <div
            onClick={() => oC(id)}
            className={`flex w-14 h-7 bg-gray-600 rounded-full ${active ? "bg-green-600" : ""} cursor-pointer`}
        >
            <span className={`h-7 w-7 border bg-white rounded-full transition-all duration-500 ${active ? "ml-7" : ""}`}></span>
        </div>
    )
}

export default Switch