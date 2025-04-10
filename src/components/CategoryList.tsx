import React from 'react';
import { ForumCategory } from '../types/forum';

interface CategoryListProps {
  categories: ForumCategory | ForumCategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const renderCategory = (category: ForumCategory) => {
    // Only render level 1 categories and their children
    if (category.level === 1) {
      return (
        <div key={category.id} className="mb-6 category-block">
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 category-title">{category.title}</h2>
            <div className="category-grid gap-4">
              {category.children.map(child => (
                <div key={child.id} className="subcategory-card p-4">
                  <h3 className="subcategory-title">{child.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // If it's a single category (root), render its children
  if (!Array.isArray(categories)) {
    return (
      <div className="container mx-auto px-4 py-8">
        {categories.children.map(category => renderCategory(category))}
      </div>
    );
  }

  // If it's an array, render each category
  return (
    <div className="container mx-auto px-4 py-8">
      {categories.map(category => renderCategory(category))}
    </div>
  );
};

export default CategoryList; 