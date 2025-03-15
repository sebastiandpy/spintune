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
import { Disc, Music, UserCircle, KeyRound, LogIn, UserPlus, Volume2, Play } from "lucide-react";

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
              <TabsList className="grid grid-cols-2 mb-6 bg-brown-light border border-gold border-opacity-20 p-1">
                <TabsTrigger 
                  value="login" 
                  className="flex items-center gap-2 data-[state=active]:bg-red-curtain data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="flex items-center gap-2 data-[state=active]:bg-red-curtain data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <UserPlus size={16} />
                  <span>Register</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-red-curtain flex items-center justify-center shadow-lg">
                      <Disc size={30} className="text-cream animate-spin-slow" />
                    </div>
                  </div>
                  <h2 className="font-display text-3xl mb-3 text-gold">Welcome Back</h2>
                  <p className="text-cream text-opacity-80 max-w-xs mx-auto">
                    Sign in to access your vinyl collection and start spinning records
                  </p>
                </div>
                
                <div className="border-t border-gold border-opacity-20 pt-6 mt-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display text-cream flex items-center gap-2">
                              <UserCircle size={16} className="text-gold" />
                              <span>Username</span>
                            </FormLabel>
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
                            <FormLabel className="font-display text-cream flex items-center gap-2">
                              <KeyRound size={16} className="text-gold" />
                              <span>Password</span>
                            </FormLabel>
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
                        className="w-full py-3 px-6 text-center bg-red-curtain hover:bg-red-bright text-white font-semibold rounded-md transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Disc className="animate-spin h-4 w-4" />
                            <span>Logging in...</span>
                          </>
                        ) : (
                          <>
                            <Music className="h-5 w-5" />
                            <span>Start Listening</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-red-curtain flex items-center justify-center shadow-lg">
                      <UserPlus size={30} className="text-cream" />
                    </div>
                  </div>
                  <h2 className="font-display text-3xl mb-3 text-gold">Join SpinTune</h2>
                  <p className="text-cream text-opacity-80 max-w-xs mx-auto">
                    Create an account to start your vinyl journey and discover classic albums
                  </p>
                </div>
                
                <div className="border-t border-gold border-opacity-20 pt-6 mt-6">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display text-cream flex items-center gap-2">
                              <UserCircle size={16} className="text-gold" />
                              <span>Choose Username</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your preferred username"
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
                            <FormLabel className="font-display text-cream flex items-center gap-2">
                              <KeyRound size={16} className="text-gold" />
                              <span>Create Password</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="••••••••"
                                className="px-4 py-3 rounded bg-brown-light text-cream focus:ring-2 focus:ring-gold focus:outline-none border border-gold border-opacity-20"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        className="w-full py-3 px-6 text-center bg-red-curtain hover:bg-red-bright text-white font-semibold rounded-md transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Disc className="animate-spin h-4 w-4" />
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-5 w-5" />
                            <span>Create Account</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Hero/Info Column */}
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-md bg-brown bg-opacity-70 p-8 rounded-lg border border-gold border-opacity-20 shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="font-display text-4xl text-gold mb-3">
                Experience Vinyl Nostalgia
              </h2>
              <div className="w-32 h-1 bg-red-curtain mx-auto rounded-full shadow-sm"></div>
            </div>
            
            <p className="text-cream text-opacity-90 mb-8 leading-relaxed text-center">
              SpinTune brings the warm, authentic experience of vinyl records to the digital age.
              Enjoy the visual aesthetics of spinning records and the rich sound of your favorite albums.
            </p>
            
            <div className="relative mb-8 bg-brown-light bg-opacity-30 p-6 rounded-lg border border-gold border-opacity-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-curtain px-4 py-1 rounded-full text-white font-display text-sm shadow-md">
                Premium Features
              </div>
              
              <ul className="space-y-4 text-cream text-opacity-90">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                    <Disc size={16} className="text-gold" />
                  </div>
                  <span>Authentic vinyl spinning animations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                    <Music size={16} className="text-gold" />
                  </div>
                  <span>Hand-picked album collection with detailed information</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                    <Volume2 size={16} className="text-gold" />
                  </div>
                  <span>Vintage turntable visualizer with realistic details</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold bg-opacity-20 flex items-center justify-center">
                    <Play size={16} className="text-gold" />
                  </div>
                  <span>Full track listings and playback control interface</span>
                </li>
              </ul>
            </div>
            
            <p className="text-center text-cream text-opacity-70 text-sm italic">
              "The perfect blend of nostalgia and modern technology for music lovers."
            </p>
          </div>
        </div>
      </main>
      
      {/* Decorative Curtains */}
      <Curtains />
    </div>
  );
}
