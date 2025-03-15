import Header from "@/components/Header";
import AlbumSelection from "@/components/AlbumSelection";
import Curtains from "@/components/Curtains";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  
  return (
    <div className="min-h-screen text-cream font-sans overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-40 container mx-auto px-4 pb-20 pt-8">
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <span>Welcome, {user?.username}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logoutMutation.mutate()}
              className="text-gold hover:text-cream"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <AlbumSelection />
      </main>
      
      {/* Decorative Curtains */}
      <Curtains isOpen={true} />
    </div>
  );
}
