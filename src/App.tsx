
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import AllCoursesPage from "./pages/courses/AllCoursesPage";
import SingleCoursePage from "./pages/courses/SingleCoursePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/courses" element={<AllCoursesPage />} />
            <Route path="/courses/:courseId" element={<SingleCoursePage />} />
            <Route path="/content-bank" element={<ContentBankPlaceholder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for Content Bank
const ContentBankPlaceholder = () => (
  <div className="container mx-auto px-6 py-8 max-w-7xl">
    <div className="text-center">
      <h1 className="font-heading font-bold text-3xl mb-4">Content Bank</h1>
      <p className="text-muted-foreground text-lg">Coming soon in Phase 2...</p>
    </div>
  </div>
);

export default App;
