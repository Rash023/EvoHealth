import { FullBlog } from "../components/Blog/FullBlog";
import { Spinner } from "../components/Blog/Spinner";
import { useBlog } from "../hooks/blogHook";
import { useParams } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/Sidebar/Sidebar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        {loading || !blog ? (
          <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
              <Spinner />
            </div>
          </div>
        ) : (
          <FullBlog blog={blog} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
