import DataLoader from 'dataloader';
import { Category } from './models/Category';

export const categoryLoader = new DataLoader<readonly any[], any>(async (categoryIds) => {
  const categories = await Category.find({ _id: { $in: categoryIds as any[] } });

  return categoryIds.map((id) => categories.find((category: any) => category._id.equals(id)));
});
