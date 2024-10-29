import { useEffect, useRef, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/Sidebar/Sidebar";
import { useBlogs } from "../hooks/blogHook";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { StaffPicks } from "@/components/Blog/StaffPicks";
import { RecommendedTopics } from "@/components/Blog/RecommendedTopics";
import { WhoToFollow } from "@/components/Blog/WhoToFollow";
import { BlogSkeleton } from "@/components/Blog/BlogSkeleton";
import { BlogCard } from "@/components/Blog/BlogCard";

export const Blogs = () => {
  const topics = [
    "For you",
    "Following",
    "Mental Health",
    "Nutrition",
    "Exercise",
    "Sleep Health",
    "Heart Health",
    "Diabetes",
    "Pain Management",
    "Stress Management",
    "Blood Pressure",
    "Healthy Diet",
    "Gut Health",
    "Skin Care",
    "Immunology"
  ];

  const { loading, blogs } = useBlogs();

  const topicNavRef = useRef(null);

  const [selectedTopic, setSelectedTopic] = useState("For you");

  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);

  const scrollLeft = () => {
    if (topicNavRef.current) {
      topicNavRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (topicNavRef.current) {
      topicNavRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const checkChevrons = () => {
    if (topicNavRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = topicNavRef.current;
      setShowLeftChevron(scrollLeft > 0);
      setShowRightChevron(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const refCurrent = topicNavRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", checkChevrons);
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", checkChevrons);
      }
    };
  }, []);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Scrollable Topic Navigation with Chevron Buttons */}
              <div className="flex items-center gap-2 px-4 py-2 lg:-mt-3 -mt-6">
                {/* Show Left Chevron only when necessary */}
                {showLeftChevron && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollLeft}
                    className="text-muted-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}

                <div
                  ref={topicNavRef}
                  className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary rounded-full p-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {topics.map((topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      size="sm"
                      className={
                        selectedTopic === topic
                          ? "font-bold"
                          : "text-muted-foreground"
                      }
                      onClick={() => handleTopicSelect(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>

                {/* Show Right Chevron only when necessary */}
                {showRightChevron && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollRight}
                    className="text-muted-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Blog Feed */}
              {loading ? (
                <div className="space-y-6 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <BlogSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-8 mt-4">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      authorName={blog.author.name || "Anonymous"}
                      title={blog.title}
                      content={blog.content}
                      publishedDate={"Aug 12"}
                      views={3300}
                      comments={34}
                      domain={blog.domain}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden space-y-8 lg:block">
              <StaffPicks />
              <RecommendedTopics />
              <WhoToFollow />
            </aside>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
