"use client";

import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import useProject from "@/hooks/use-project";

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Q&A",
      url: "/qa",
      icon: Bot,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: Presentation,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <img src={"/favicon.ico"} alt="logo" className="size-8" />
          {open && (
            <h1 className="text-primary/80 text-xl font-bold">DIONYSUS</h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn({
                          "!bg-primary !text-white": pathname === item.url,
                        })}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project: { id: string; name: string }) => {
                return (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div
                        onClick={() => {
                          setProjectId(project.id);
                          if (pathname !== "/dashboard") {
                            router.push("/dashboard");
                          }
                        }}
                        className={cn("cursor-pointer", {
                          "bg-primary/20": project.id === projectId,
                        })}
                      >
                        <div
                          className={cn(
                            "text-primary -ml-1 flex size-6 items-center justify-center rounded-sm border bg-white text-sm",
                            {
                              "bg-primary text-white": project.id === projectId,
                            },
                          )}
                        >
                          <span className="p-3">{project.name[0]}</span>
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <div className="h-2"></div>
              {open && (
                <SidebarMenuItem>
                  <Link href={"/create"}>
                    <Button
                      size={"sm"}
                      variant="outline"
                      className="w-fit px-2"
                    >
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
