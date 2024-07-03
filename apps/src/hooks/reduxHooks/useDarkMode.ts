import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { toggleDarkMode } from '../../../store/darkmodeSlice/darkmode';

const useDarkMode = () => {
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleDarkMode());
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  return { toggle, darkModeState };
};
export default useDarkMode;
