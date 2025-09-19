
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { keyPersonnel } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = keyPersonnel.find(p => p.id === params.id);

  if (!person) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: person.name,
    description: `Read the profile of ${person.name}, ${person.title}.`,
  };
}

export default function ProfilePage({ params }: Props) {
  const person = keyPersonnel.find(p => p.id === params.id);

  if (!person) {
    notFound();
  }

  const personImage = PlaceHolderImages.find(p => p.id === person.imageId);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col items-center">
              {personImage && (
                <Image
                  src={personImage.imageUrl}
                  alt={`Portrait of ${person.name}`}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-muted object-cover aspect-square"
                  quality={95}
                  priority
                />
              )}
            </div>
            <div className="md:col-span-2 space-y-2">
                 <h1 className="text-3xl font-bold tracking-tight">{person.name}</h1>
                 <p className="text-lg font-medium text-primary">{person.title}</p>
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
