
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
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
            <div className="md:w-1/3 flex-shrink-0 text-center">
              {personImage && (
                <Image
                  src={personImage.imageUrl}
                  alt={`Portrait of ${person.name}`}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-muted object-cover aspect-square inline-block"
                  quality={95}
                  priority
                />
              )}
            </div>
            <div className="md:w-2/3 space-y-2 text-center md:text-left">
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
