import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`} passHref>
      <Card className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent h-full">
        {category.thumbnailUrl && (
          <CardHeader className="p-0 relative">
            <Image
              src={category.thumbnailUrl}
              alt={category.name}
              width={300}
              height={150}
              className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="category image"
            />
          </CardHeader>
        )}
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold group-hover:text-accent transition-colors flex justify-between items-center">
            {category.name}
            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1" />
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
