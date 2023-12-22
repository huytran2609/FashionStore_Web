import { HiOutlineSearch } from 'react-icons/hi';

function InputSearch({ type, placeholder, value, setValue }) {
    return (
        <div className="relative">
            <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange = {(e) => setValue({q : e.target.value.trimStart()}) }
                className="text-sm outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-md"
            />
        </div>
    );
}

export default InputSearch;
