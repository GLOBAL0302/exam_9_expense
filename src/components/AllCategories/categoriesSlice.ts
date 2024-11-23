import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCategoryById, fetchAllCategories, fetchOneCategoryById, postCategory } from './categoriesThunk.ts';
import { ICategoriesList, ICategoryForm } from '../../types';

interface ICategoriesState {
  oneCategory:ICategoryForm
  categories:ICategoriesList[]
  postCategoryLoading:boolean,
  fetchCategoriesLoading:boolean
  deleteCategoryLoading:boolean
}

const initialState:ICategoriesState = {
  oneCategory:{
    categoryName:"",
    categoryType:"",
  },
  categories: [],
  postCategoryLoading: false,
  fetchCategoriesLoading: false,
  deleteCategoryLoading:false
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory:(state, {payload})=>{
      state.categories = state.categories.filter(category => category.id !== payload.id)
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(postCategory.pending, state => {
        state.postCategoryLoading = true;
      })
      .addCase(postCategory.fulfilled, state => {
        state.postCategoryLoading = false;
      })
      .addCase(postCategory.rejected, state => {
        state.postCategoryLoading = false;
      });

    builder
      .addCase(fetchAllCategories.pending, state => {
        state.fetchCategoriesLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, { payload }:PayloadAction<ICategoriesList[]>) => {
        state.fetchCategoriesLoading = false;
        state.categories = payload;

      })
      .addCase(fetchAllCategories.rejected, state => {
        state.fetchCategoriesLoading = false;
      });

    builder
      .addCase(deleteCategoryById.pending, state => {
        state.deleteCategoryLoading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state,) => {
        state.deleteCategoryLoading = false;
      })
      .addCase(deleteCategoryById.rejected, state => {
        state.deleteCategoryLoading = false;
      });

    builder
      .addCase(fetchOneCategoryById.pending, state => {
        state.fetchCategoriesLoading = true;
      })
      .addCase(fetchOneCategoryById.fulfilled, (state,{payload}) => {
        state.oneCategory = payload;
        state.fetchCategoriesLoading=false
      })
      .addCase(fetchOneCategoryById.rejected, state => {
        state.fetchCategoriesLoading = false;
      });
  },
  selectors: {
    selectAllCategories: (state) => state.categories,
    selectPostCategoriesLoading: (state) => state.postCategoryLoading,
    selectFetchCategoryLoading: (state) => state.fetchCategoriesLoading,
    selectOneCategory:(state)=> state.oneCategory,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {deleteCategory} = categoriesSlice.actions;
export const {
  selectPostCategoriesLoading,
  selectFetchCategoryLoading,
  selectAllCategories,
  selectOneCategory
} = categoriesSlice.selectors;