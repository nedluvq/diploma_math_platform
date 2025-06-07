import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import Login from "../view/Login";
import MainPage from "../view/MainPage";
import Achievements from "../view/Achievements";
import Rating from "../view/Rating";
import { TaskWrapper } from "../helpers/TaskWrapper";
import { ExperienceBar } from "../components/ExperienceBar";
import { ResetProgress } from "../components/ResetProgress";
import Final from "../view/Tasks/Final";
import UserMetricsDashboard from "../view/Tasks/UserMetricsDashboard";
import Profile from "../view/Profile";

const ExperienceBarWrapper = () => {
  const location = useLocation();
  return location.pathname !== routes.Login ? <ExperienceBar /> : null;
};

export const AppRouter = () => (
  <BrowserRouter>
    <ExperienceBarWrapper />
    <Routes>
      <Route path={routes.Login} element={<Login />} />
      <Route path={routes.MainPage} element={<MainPage />} />
      <Route path={routes.Achivements} element={<Achievements />} />
      <Route path={routes.Rating} element={<Rating />} />
      <Route path={routes.Task} element={<TaskWrapper />} />
      <Route path={routes.Final} element={<Final />} />
      <Route path={routes.Metrics} element={<UserMetricsDashboard />} />
      <Route path={routes.Profile} element={<Profile />} />
    </Routes>
    {process.env.NODE_ENV === 'development' && <ResetProgress />}
  </BrowserRouter>
);