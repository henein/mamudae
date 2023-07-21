import { useContext } from 'react';
import { ScrollContext } from '../../component/ScrollProvider';

const useScroll = () => {
  return useContext(ScrollContext);
};

export default useScroll;
