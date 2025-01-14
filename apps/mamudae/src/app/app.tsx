import { Route, Routes } from 'react-router-dom';
import { MaplePickPage } from './pages/maple-pick-page';
import { HomePage } from './pages/home-page';
import { RoutePath } from '../constants';

export function App() {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<HomePage />} />
      <Route path={RoutePath.MaplePick} element={<MaplePickPage />} />
    </Routes>
  );
}

export default App;
