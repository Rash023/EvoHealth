import {
  Inbox,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
  MessagesSquare,
  ChartNetwork,
  CircleUser,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sidebarLeftData = {
    navMain: [
      {
        title: "Ask eH",
        icon: Sparkles,
        link: "/",
      },
      {
        title: "Messages",
        icon: MessagesSquare,
        link: "/",
      },
      {
        title: "Doctors",
        icon: ChartNetwork,
        link: "/",
      },
      {
        title: "Blogs",
        icon: MessagesSquare,
        link: "/blog",
      },
    ],
  };
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <h1 className="ml-2 text-4xl mt-4">evoHealth</h1>
      </SidebarHeader>
      <SidebarHeader>
        <NavMain items={sidebarLeftData.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <AlertDialog>
                <AlertDialogTrigger>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div>
                        <MessageCircleQuestion />
                        <span>Help</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div className="flex">
                    <AlertDialogHeader className="text-2xl mt-1.5">
                      Help
                    </AlertDialogHeader>
                    <div className="flex-grow"></div>
                    <AlertDialogCancel>
                      <Cross1Icon className="h-3 w-3" />
                    </AlertDialogCancel>
                  </div>
                  <></>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div>
                        <Settings2 />
                        <span>Settings</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div className="flex">
                    <AlertDialogHeader className="text-2xl mt-1.5">
                      Settings
                    </AlertDialogHeader>
                    <div className="flex-grow"></div>
                    <AlertDialogCancel>
                      <Cross1Icon className="h-3 w-3" />
                    </AlertDialogCancel>
                  </div>
                  <></>
                </AlertDialogContent>
              </AlertDialog>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div>
                    <CircleUser />
                    <span>Profile</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function NavMain({
  items,
}: {
  items: {
    title: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.link}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
