import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Curtains from "@/components/Curtains";
import Header from "@/components/Header";

// Extend the schema with validation rules
const authSchema = insertUserSchema.extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function AuthPage() {
  const { loginMutation, registerMutation, user } = useAuth();
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: AuthFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: AuthFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen text-cream font-sans overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-40 container mx-auto px-4 pb-20 pt-8 flex flex-col md:flex-row gap-8">
        {/* Auth Form Column */}
        <div className="flex-1 flex justify-center items-center">
          <div className="auth-container max-w-md w-full bg-brown bg-opacity-90 rounded-lg p-8 shadow-2xl border border-gold border-opacity-30">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <h2 className="font-display text-3xl text-center mb-6 text-gold">Welcome Back</h2>
                <p className="text-center mb-8 text-cream text-opacity-80">
                  Sign in to access your vinyl collection
                </p>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display text-cream">Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="yourusername"
                              className="px-4 py-3 rounded bg-brown-light text-cream focus:ring-2 focus:ring-gold focus:outline-none border border-gold border-opacity-20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display text-cream">Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="px-4 py-3 rounded bg-brown-light text-cream focus:ring-2 focus:ring-gold focus:outline-none border border-gold border-opacity-20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      className="w-full py-3 px-6 text-center bg-red-curtain hover:bg-red-bright text-white font-semibold rounded-md transition-colors duration-300 shadow-lg"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Start Listening"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <h2 className="font-display text-3xl text-center mb-6 text-gold">Join SpinTune</h2>
                <p className="text-center mb-8 text-cream text-opacity-80">
                  Create an account to start your vinyl journey
                </p>
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display text-cream">Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Choose a username"
                              className="px-4 py-3 rounded bg-brown-light text-cream focus:ring-2 focus:ring-gold focus:outline-none border border-gold border-opacity-20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display text-cream">Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="px-4 py-3 rounded bg-brown-light text-cream focus:ring-2 focus:ring-gold focus:outline-none border border-gold border-opacity-20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      className="w-full py-3 px-6 text-center bg-red-curtain hover:bg-red-bright text-white font-semibold rounded-md transition-colors duration-300 shadow-lg"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Hero/Info Column */}
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-md">
            <h2 className="font-display text-4xl text-gold mb-4">Experience Vinyl Nostalgia</h2>
            <p className="text-cream text-opacity-90 mb-6">
              SpinTune brings the warm, authentic experience of vinyl records to the digital age.
              Enjoy the visual aesthetics of spinning records and the rich sound of your favorite albums.
            </p>
            <div className="mb-6">
              <h3 className="font-display text-xl text-gold mb-2">Features:</h3>
              <ul className="space-y-2 text-cream text-opacity-80">
                <li className="flex items-center gap-2">
                  <span className="text-gold">•</span>
                  <span>Authentic vinyl spinning animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">•</span>
                  <span>Hand-picked album collection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">•</span>
                  <span>Vintage turntable visualizer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">•</span>
                  <span>Full track listings and playback control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      {/* Decorative Curtains */}
      <Curtains />
    </div>
  );
}
