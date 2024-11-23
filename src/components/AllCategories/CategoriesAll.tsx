import { CircularProgress, Grid2 } from '@mui/material';
import Category from './Category.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllCategories, selectFetchCategoryLoading } from './categoriesSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllCategories } from './categoriesThunk.ts';

interface Props {
  openCloseModal?:VoidFunction
}

const CategoriesAll:React.FC<Props> = ({openCloseModal}) => {
  const AllCategories = useAppSelector(selectAllCategories);
  const fetchLoading = useAppSelector(selectFetchCategoryLoading);
  const dispatch = useAppDispatch();


  const fetchCategory = useCallback(async () => {
    await dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    void fetchCategory();
  }, [fetchCategory]);

  return (
    <Grid2
      marginTop={2}
      container
      flexDirection="column" gap={3}>
      {fetchLoading ? <CircularProgress /> : <>
        {AllCategories.map((category) => (
          <Category key={category.id} category={category} openCloseModal={openCloseModal} />
        ))}</>}
    </Grid2>
  );
};

export default CategoriesAll;