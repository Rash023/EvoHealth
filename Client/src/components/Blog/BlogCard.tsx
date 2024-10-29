import {
  Bookmark,
  MoreHorizontal,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

// Enhanced BlogCard Component
interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  views?: number;
  comments?: number;
  domain?: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  views,
  comments,
  domain,
}: BlogCardProps) => {
  return (
    <article className="group space-y-4">
      {/* Author Info */}
      <div className="flex items-center gap-2">
        <Avatar name={authorName} />
        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium">{authorName}</span>
          {domain && (
            <>
              <span className="text-muted-foreground">in</span>
              <span className="font-medium text-primary">{domain}</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <Link to={`/blog/${id}`} className="flex gap-4">
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold group-hover:text-primary">
            {title}
          </h2>
          <p className="line-clamp-2 text-muted-foreground">{content}</p>

          {/* Metadata */}
          <div className="flex lg:items-center justify-between text-sm text-muted-foreground items-baseline">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time>{publishedDate}</time>
              </div>
              <div className="lg:flex hidden items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{`${Math.ceil(content.length / 100)}`}</span>
              </div>
              {views && (
                <div className="lg:flex hidden items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{views.toLocaleString()}</span>
                </div>
              )}
              {comments && (
                <div className="lg:flex hidden items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{comments}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 lg:block hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="mb-2">Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="mb-2">More</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Optional Post Image */}
        <div className="flex flex-col">
          <img
            src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*uHfylafmPKkyk0lY2b1H8g.jpeg"
            alt="Post preview"
            className="h-28 w-28 rounded object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden block ml-auto"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </Link>
    </article>
  );
};

// Avatar Component
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary/10 ${
        size === "small" ? "h-8 w-8" : "h-10 w-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-sm"
        } font-medium text-primary`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
