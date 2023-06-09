import Link from "next/link";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { IoMdCreate } from "react-icons/io";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="sidebar fixed flex h-screen w-20 flex-col justify-between border-r-[1px] bg-white p-4">
      <div className="flex flex-col items-center">
        <Link href="/">
          <div className="my-4 inline-block cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
            <RxDashboard size={20} />
          </div>
        </Link>
        <Link href="/customers">
          <div className="my-4 inline-block cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
            <RxPerson size={20} />
          </div>
        </Link>
        <Link href="/create">
          <div className="my-4 inline-block cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
            <IoMdCreate size={20} />
          </div>
        </Link>
        <Link href="/">
          <div className="my-4 inline-block cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
            <FiSettings size={20} />
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
