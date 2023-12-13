const StaffButton = ({ oC, color, children }) => {
    return (<button
        className={`${color ? `bg-[${color}]` : 'bg-green-600'} text-white py-2 px-4 rounded`}
        onClick={() => { if (oC) oC() }}>
        {children}
    </button>)
}

export default StaffButton