import Home from "../pages/Dashboard/Home";
import GlobalLayout from "../layouts/GlobalLayout";
import Notifications from "../pages/Notifications/Notifications";
import Users from "../pages/Users/Users";
import UserDetails from "../pages/Users/UserDetails";
import Posts from "../pages/Posts/Posts";
import Reports from "../pages/Reports/Reports";
import ReportDetailsPage from "../pages/Reports/ReportDetailsPage";
import ReportedUserDetailsPage from "../pages/Reports/ReportedUserDetailsPage";
import WithdrawalRequestTable from "../components/Withdrawals/WithdrawalRequestTable";
import Withdrawals from "../pages/Withdrawals/Withdrawals";

export const normalRoutes = [
    {
      title: "Dashboard",
      url: "/dashboard",
      page: <GlobalLayout page={<Home />} />,
    },
    {
        title: "Dashboard",
        url: "/notifications",
        page: <GlobalLayout page={<Notifications />} />,
    },
    {
        title: "Users",
        url: "/users",
        page: <GlobalLayout page={<Users />} />,
    },
    {
      title: "Users",
      url: "/user-details",
      page: <GlobalLayout page={<UserDetails />} />,
  },

  {
    title: "Posts",
    url: "/posts",
    page: <GlobalLayout page={<Posts />} />,
},
{
  title: "Reports",
  url: "/reports",
  page: <GlobalLayout page={<Reports />} />,
},
{
  title: "Reports",
  url: "/report-details",
  page: <GlobalLayout page={<ReportDetailsPage />} />,
},

{
  title: "Reported user detail",
  url: "/report-user-details",
  page: <GlobalLayout page={<ReportedUserDetailsPage />} />,
},


{
  title: "Withdrawal request table",
  url: "/withdrawals",
  page: <GlobalLayout page={<Withdrawals />} />,
},

]    
