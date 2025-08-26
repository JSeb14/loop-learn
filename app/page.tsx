import { AuthButton } from "@/components/auth/auth-button";
import logo from "@/app/assets/logo.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <div className="mx-auto w-48 h-48 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-card rounded-full p-6 shadow-2xl border border-border/50 group-hover:shadow-3xl transition-all duration-300">
                <Image
                  src={logo}
                  width={150}
                  height={150}
                  alt="LoopLearn Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Welcome to <span className="text-gradient">LoopLearn</span>
                <span className="text-primary">!</span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Build flexible flashcard sets for any subject to{" "}
                <span className="text-primary font-semibold">
                  accelerate your learning
                </span>
                , so you have more time to do the things you{" "}
                <span className="text-accent font-semibold">enjoy!</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-modern p-6 text-center group hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <div className="w-6 h-6 bg-primary rounded-sm" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Create Sets
              </h3>
              <p className="text-sm text-muted-foreground">
                Build custom flashcard sets for any subject
              </p>
            </div>

            <div className="card-modern p-6 text-center group hover:border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <div className="w-6 h-6 bg-accent rounded-full" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Study Smart
              </h3>
              <p className="text-sm text-muted-foreground">
                Practice with interactive flashcards
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Ready to transform your learning?
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AuthButton />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
