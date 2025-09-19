
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { useKeyPersonnel } from '@/context/KeyPersonnelContext';

type Props = {
  params: { id: string };
};

export default function ProfilePage({ params }: Props) {
  const { id } = params;
  const { keyPersonnel } = useKeyPersonnel();
  const person = keyPersonnel.find(p => p.id === id);

  if (!person) {
    notFound();
  }

  const personImage = PlaceHolderImages.find(p => p.id === person.imageId);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              {personImage && (
                <Image
                  src={personImage.imageUrl}
                  alt={`Portrait of ${person.name}`}
                  width={200}
                  height={200}
                  className="rounded-lg border-4 border-muted object-cover aspect-square"
                  quality={95}
                  priority
                />
              )}
            </div>
            <div className="flex-grow pt-4 text-center md:text-left">
                 <h1 className="text-3xl font-bold tracking-tight">{person.name}</h1>
                 <p className="text-xl font-medium text-primary mt-1">{person.title}</p>
            </div>
          </div>
          <div className="mt-8 prose prose-gray max-w-none dark:prose-invert text-muted-foreground space-y-4">
            {person.bio.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-base">
                    {paragraph}
                </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
