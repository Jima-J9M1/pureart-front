import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About - EB Art',
  description: 'Learn more about the artist and their work.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">About the Artist</h1>
          <div className="prose prose-lg">
            <p>
              Welcome to my art gallery. I am a contemporary artist passionate about
              creating unique pieces that evoke emotion and tell stories through
              various mediums.
            </p>
            <p>
              My work explores the intersection of traditional techniques and modern
              expression, often drawing inspiration from nature, human emotions, and
              cultural experiences.
            </p>
            <p>
              Each piece is created with careful attention to detail and a deep
              understanding of the materials used. I believe in the power of art to
              connect people and create meaningful experiences.
            </p>
          </div>
        </div>
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/artist-image.jpg"
            alt="Artist portrait"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Artist Statement */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Artist Statement</h2>
        <div className="prose prose-lg max-w-3xl">
          <p>
            My artistic journey is driven by a desire to capture the essence of
            moments and emotions through visual expression. I work primarily with
            [mediums] to create pieces that invite viewers to engage with the work
            on multiple levels.
          </p>
          <p>
            The creative process is as important to me as the final result. Each
            piece undergoes a journey of exploration and refinement, often
            incorporating elements of chance and spontaneity alongside careful
            planning and execution.
          </p>
          <p>
            Through my work, I aim to create a dialogue between the artwork and
            the viewer, encouraging personal interpretation and emotional
            connection. I believe that art has the power to transform spaces and
            lives, and I am committed to creating pieces that resonate with
            collectors and art enthusiasts alike.
          </p>
        </div>
      </div>

      {/* Exhibition History */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Exhibition History</h2>
        <div className="space-y-6">
          <div className="border-l-2 border-gray-200 pl-4">
            <h3 className="text-xl font-semibold">2024</h3>
            <p className="text-gray-600">Solo Exhibition - Gallery Name, Location</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-4">
            <h3 className="text-xl font-semibold">2023</h3>
            <p className="text-gray-600">Group Exhibition - Gallery Name, Location</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-4">
            <h3 className="text-xl font-semibold">2022</h3>
            <p className="text-gray-600">Art Fair - Event Name, Location</p>
          </div>
        </div>
      </div>
    </div>
  );
} 