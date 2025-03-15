import { useParams } from "wouter";
import VinylPlayer from "@/components/VinylPlayer";
import Header from "@/components/Header";
import Curtains from "@/components/Curtains";

export default function PlayerPage() {
  const params = useParams();
  const albumId = params.id ? parseInt(params.id) : 1; // Default to first album if no ID provided
  
  return (
    <div className="min-h-screen text-cream font-sans overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Custom background for the player page */}
      <div className="absolute inset-0 z-0 bg-repeat opacity-20"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii4wNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbGw9IiM3MDQyMTQiIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjxwYXRoIGZpbGw9IiM1NTMzMTEiIGZpbGwtb3BhY2l0eT0iLjUiIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')",
          backgroundColor: '#40281B',
        }}
      ></div>
      
      {/* Dark gradient overlay for better readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brown-dark via-transparent to-brown-dark opacity-80"></div>

      {/* Main Content */}
      <main className="relative z-40 container mx-auto px-4 pb-20 pt-8">
        <VinylPlayer albumId={albumId} />
      </main>
      
      {/* Decorative Curtains */}
      <Curtains isOpen={true} />
    </div>
  );
}
