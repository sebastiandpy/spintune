import { useParams } from "wouter";
import VinylPlayer from "@/components/VinylPlayer";
import Header from "@/components/Header";
import Curtains from "@/components/Curtains";

export default function PlayerPage() {
  const params = useParams();
  const albumId = parseInt(params.id);
  
  return (
    <div className="min-h-screen text-cream font-sans overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-40 container mx-auto px-4 pb-20 pt-8">
        <VinylPlayer albumId={albumId} />
      </main>
      
      {/* Decorative Curtains */}
      <Curtains isOpen={true} />
    </div>
  );
}
