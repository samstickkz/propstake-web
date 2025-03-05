import { RiSearchLine } from "react-icons/ri";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className="w-full flex items-center rounded-full border border-stroke bg-white px-5 py-5 text-black outline-none transition active:border-primary disabled:bg-white focus:ring-2 focus:ring-primary focus:border-primary h-[52px]">
      <RiSearchLine size={20} color="#A1A1AA" />
      <input
        name="search_term"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange} // Now correctly typed
        className="w-full border-none py-3 pl-2 ml-1 focus:outline-none bg-white font-inter"
      />
    </div>
  );
};
