"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  BellIcon,
  CalendarDays,
  CreditCard,
  FileText,
  HotelIcon,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Quartos", href: "/rooms", icon: HotelIcon },
  { name: "Reservas", href: "/bookings", icon: CalendarDays },
  { name: "Hóspedes", href: "/guests", icon: Users },
  { name: "Pagamentos", href: "/payments", icon: CreditCard },
  { name: "Relatórios", href: "/reports", icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-muted/20 md:flex-row">
        {/* Menu Lateral - Desktop e Tablet */}
        <div className="hidden w-64 flex-shrink-0 border-r bg-sidebar md:block">
          <div className="flex h-full flex-col">
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-4 py-2">
                <HotelIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HotelPro</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.name}
                    >
                      <a href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Gerente do Hotel
                  </span>
                </div>
              </div>
            </SidebarFooter>
          </div>
        </div>

        {/* Menu Lateral - Mobile */}
        <div className="md:hidden">
          <Sidebar>
            <SidebarHeader className="border-b">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <HotelIcon className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">HotelPro</span>
                </div>
                <SidebarTrigger />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <a href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Gerente do Hotel
                  </span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div className="flex h-14 flex-shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0">
                  3
                </Badge>
              </Button>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function NotificationItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <DropdownMenuItem className="flex flex-col items-start p-4 cursor-default">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
      <div className="text-xs text-muted-foreground mt-1">{time}</div>
    </DropdownMenuItem>
  );
}
