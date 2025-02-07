import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { RiNotificationLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsExclamationSquare } from "react-icons/bs";
import { HiOutlineShieldExclamation } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { PiHandWithdrawBold } from "react-icons/pi";
import { LuDollarSign } from "react-icons/lu";

import { IoCartOutline } from "react-icons/io5";









export const sidebarArr = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard />,
  },

  {
    title: "Notifications",
    url: "/notifications",
    icon: <RiNotificationLine />,
  },


  {
    title: "User Management",
    url: "/users",
    icon: <FiUsers />,
  },

  {
    title: "Posts Management",
    url: "/posts",
    icon: <CgFileDocument />,
  },

  {
    title: "Reports Management",
    url: "/reports",
    icon: <TbReportSearch />,
  },

  {
    title: "Withdrawal Requests",
    url: "/withdrawals",
    icon: <PiHandWithdrawBold />,
  },

  {
    title: "Revenue Management",
    url: "/revenue",
    icon: <LuDollarSign />,
  },


  {
    title: "Orders Management",
    url: "/orders",
    icon: <IoCartOutline />,
  },
  // {
  //   title: "Terms Of Services",
  //   url: "/termsofservice",
  //   icon: <HiOutlineShieldExclamation />,
  // },
  // {
  //   title: "Privacy Policy",
  //   url: "/privacy-policy",
  //   icon: <HiOutlineExclamationCircle />,
  // },
 

  
];