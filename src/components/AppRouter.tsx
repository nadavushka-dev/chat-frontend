import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./AuthPage";
import Homepage from "./Homepage";
import ChatRoom from "./ChatRoom";
import RoomList from "./RoomList";
import MemberList from "./MemberList";
import { userSelectors } from "../store/selectors/user.selectors";

const AppRouter = () => {
  const isAuthenticated = useSelector(userSelectors.isAuth);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/room/:roomId"
        element={
          <main className="app-main">
            <RoomList />
            <ChatRoom />
            <MemberList />
          </main>
        }
      />
    </Routes>
  );
};

export default AppRouter;
