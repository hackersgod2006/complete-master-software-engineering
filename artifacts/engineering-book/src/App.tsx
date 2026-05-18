import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/home";
import { Reader } from "@/pages/reader";
import { Dashboard } from "@/pages/dashboard";
import { ExamPage } from "@/pages/exam";
import { FlashcardsPage } from "@/pages/flashcards";
import { useSettings } from "@/hooks/use-settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/read/:chapterId/:sectionId" component={Reader} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/exam/:chapterId" component={ExamPage} />
      <Route path="/flashcards/:chapterId" component={FlashcardsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppInner() {
  useSettings();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return <AppInner />;
}
