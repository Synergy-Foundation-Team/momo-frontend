import { ReactNode, Dispatch, SetStateAction, useState } from 'react';
import ProfileInfo from './profile-info';
import Orders from './order';
import Addresses from './address';
import { Heart, User, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProfileProps {
  setActiveComponent: Dispatch<SetStateAction<ReactNode>>;
}

const menuItems = [
  { name: 'ข้อมูล ส่วนตัว', component: <ProfileInfo />, icon: <Heart className="w-6 h-6" /> },
  { name: 'My orders', component: <Orders />, icon: <User className="w-6 h-6" /> },
  { name: 'ที่อยู่', component: <Addresses />, icon: <ShoppingBag className="w-6 h-6" /> }
];

export default function SidebarProfile({ setActiveComponent }: SidebarProfileProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* Desktop View */}
      <aside className="hidden md:block bg-gray-100 p-4 rounded-lg w-64">
        <nav className="space-y-1 relative">
          {menuItems.map((item, index) => (
            <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setActiveComponent(item.component);
            }}
            className={`relative w-full flex items-center justify-between px-4 py-3 text-lg text-left rounded-lg transition-all duration-200
              ${activeIndex === index ? 'text-[#1B4B66]' : 'hover:bg-gray-200'}`}
          >
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 border-l-[5px] border-l-[#17494D] rounded-r"
                initial={{ opacity: 0, x: -10 }} // เริ่มต้นให้เลื่อนเข้ามาทางซ้ายเล็กน้อย
                animate={{ opacity: 1, x: 0 }} // ค่อยๆ เลื่อนเข้ามา
                exit={{ opacity: 0, x: -10 }} // ออกไปทางซ้ายเมื่อเปลี่ยน tab
                transition={{ type: "spring", stiffness: 120, damping: 15 }} // Spring ลื่นๆ ไม่เด้งแรง
              />
            )}
            <span className="relative">{item.name}</span>
          </button>          
          ))}
        </nav>
      </aside>

      {/* Mobile View - Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 px-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setActiveComponent(item.component);
            }}
            className="flex flex-col items-center space-y-1 relative w-1/3 py-2" // กำหนดให้ tab มีขนาดเท่ากัน
          >
            {/* Background Indicator */}
            {activeIndex === index && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[5rem] bg-[#EAF1F8] rounded-lg"
                layoutId="tabActiveBg"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {/* Icon */}
            <span className={`relative ${activeIndex === index ? 'text-[#1B4B66]' : 'text-gray-700'}`}>
              {item.icon}
            </span>

            {/* Text */}
            <span className={`relative ${activeIndex === index ? 'text-[#1B4B66] font-medium' : 'text-gray-700'}`}>
              {item.name}
            </span>

            {/* Indicator Dot */}
            {activeIndex === index && (
              <motion.span
                layoutId="dotIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
