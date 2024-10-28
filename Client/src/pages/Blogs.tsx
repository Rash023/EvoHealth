import { Appbar } from "../components/ui/AppBar";
import { BlogCard } from "../components/Blog/BlogCard";
import { BlogSkeleton } from "../components/Blog/BlogSkeleton";
import { useBlogs } from "../hooks/blogHook";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/Sidebar/Sidebar";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        
        {loading ? (
          <div className="flex justify-center p-4">
            <div>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          </div>
        ) : (
          <main className="flex justify-center p-4">
            <div>
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd Feb 2024"}
                />
              ))}
            </div>
          </main>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
