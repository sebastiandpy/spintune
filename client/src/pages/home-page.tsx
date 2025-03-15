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
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3 bg-brown bg-opacity-50 py-2 px-4 rounded-full border border-gold border-opacity-20"
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}  
          >
            <span className="text-cream">Welcome, <span className="text-gold font-medium">{user?.username}</span></span>
            <div className="w-[1px] h-4 bg-gold bg-opacity-30"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              className="text-cream hover:text-gold hover:bg-brown-light group flex items-center gap-1 h-8"
            >
              <span>Logout</span>
              <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform" />
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
