import { RoutePath } from '../constants';
import { HomePage } from './pages/home-page';
import { MaplePickPage } from './pages/maple-pick-page';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import AlertTemplate from 'react-alert-template-basic';
import { Route, Routes } from 'react-router-dom';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 1000,
  offset: '30px',
  transition: transitions.SCALE,
};

export function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Routes>
        <Route path={RoutePath.Home} element={<HomePage />} />
        <Route
          path={`${RoutePath.MaplePick}/:id`}
          element={<MaplePickPage />}
        />
      </Routes>
    </AlertProvider>
  );
}

export default App;
