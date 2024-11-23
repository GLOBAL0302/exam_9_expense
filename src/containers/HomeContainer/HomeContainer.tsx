import { useAppDispatch } from '../../app/hooks.ts';
import { fetchAllCategories } from '../../components/AllCategories/categoriesThunk.ts';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchAllCategories())
  return (
    <div>
    </div>
  );
};

export default HomeContainer;