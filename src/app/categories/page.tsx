import { mockCategories } from '@/lib/data';
import { CategoryCard } from '@/components/ui/category-card';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground text-center">Explore Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

