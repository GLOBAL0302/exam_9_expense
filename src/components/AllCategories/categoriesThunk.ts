import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { ICategoriesList, ICategoryForm } from '../../types';

export const postCategory = createAsyncThunk<void, ICategoryForm>(
  'categories/PostCategory',
  async (category)=>{
    await axiosApi.post("categories.json", category)
  }
)

export const fetchAllCategories = createAsyncThunk<ICategoriesList[], void>(
  'categories/FetchAllCategories',
  async ()=>{
    const {data} = await axiosApi.get('/categories.json');
    return Object.keys(data).map((category) => {
      return {
        id: category,
        ...data[category]
      }
    });
  }
);

export const fetchOneCategoryById = createAsyncThunk<ICategoryForm, string>(
  'categories/FetchOneCategoryById',
  async(categoryId)=>{
    const {data} = await axiosApi.get(`categories/${categoryId}.json`);
    return data;
  })

export const deleteCategoryById = createAsyncThunk<void, ICategoriesList>(
  'categories/DeleteCategoryById',
  async (category)=>{
    await axiosApi.delete(`categories/${category.id}.json`)
  }
)

export const updateCategoryById = createAsyncThunk<void, {categoryId:string, newCategory:ICategoryForm}>(
  'categories/UpdateCategoryById',
  async({categoryId, newCategory})=>{
    await axiosApi.put(`categories/${categoryId}.json`, newCategory);
  }
)