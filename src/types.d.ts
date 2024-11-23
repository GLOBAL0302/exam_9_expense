export interface ICategoryForm{
  categoryType:string,
  categoryName:string
}

export interface ICategoryFormApi{
  [id:string]:ICategoryForm
}

export interface ICategoriesList {
  id:string
  categoryType:string,
  categoryName:string
}