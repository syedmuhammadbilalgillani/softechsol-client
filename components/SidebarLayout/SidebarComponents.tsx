"use client";

import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import LogoutButton from "../logout-button";

export const SidebarHead = () => {
  // const user = useUserStore((state) => state.user) as User | null;
  const router = useRouter();
  // const { hasPermission } = usePermission();
  // const isStoreEdit = hasPermission(PERMISSIONS.STOREMANAGEMENT);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors duration-200  group">
      <div className="relative mb-2">
        {/* {companyLogo} */}
        {/* {isStoreEdit && ( */}
        {/* <div
          // onClick={() => router.push("/admin/store/edit")}
          className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-700 p-0.5 px-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-600 group-amber-500 dark:group-amber-500 transition-colors duration-200"
        >
          <i className="fa-duotone fa-solid fa-pen text-xs rounded-full"></i>
        </div> */}
        {/* // )} */}
      </div>

      <div className="hidden group-hover:block absolute bg-gray-800 text-white text-xs px-2 py-1 rounded-md -top-8 whitespace-nowrap">
        Edit store details
      </div>
    </div>
  );
};

export function NavMain({
  items,
}: {
  items: {
    label: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      requiredPermissions?: string[];
      items?: {
        title: string;
        url: string;
        requiredPermissions?: string[];
      }[];
    }[];
  }[];
}) {
  return (
    <>
      {items?.map((group) => (
        <SidebarGroup key={group?.label}>
          <SidebarGroupLabel>
            {/* <TranslatedText textKey={group?.label} /> */}
            {group?.label}
          </SidebarGroupLabel>
          <SidebarMenu>
            {group?.items?.map((item) =>
              item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item?.title}
                  asChild
                  defaultOpen={item?.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item?.title}>
                        {item?.icon && <item.icon />}
                        <span>
                          {/* <TranslatedText textKey={item?.title ?? ""} /> */}
                          {item?.title}
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item?.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem?.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem?.url}>
                                <span>
                                  {/* <TranslatedText textKey={subItem?.title} /> */}
                                  {subItem?.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item?.title}>
                  <Link href={item?.url}>
                    <SidebarMenuButton tooltip={item?.title}>
                      {item?.icon && <item.icon />}
                      <span>
                        {/* <TranslatedText textKey={item?.title ?? ""} /> */}
                        {item?.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
export const SidebarFooterMenu = () => {
  const { data: session } = useSession();
  const displayName = session?.user?.name || session?.user?.email || "Admin";

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-nowrap flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate text-xs font-medium text-gray-700 dark:text-gray-300">
                    {displayName}
                  </span>
                </div>
                <ChevronUp className="ml-auto w-4 h-4 shrink-0" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-56 p-2">
              <div className="px-2 py-1.5 text-xs text-gray-500 border-b mb-1">
                Signed in as <span className="font-semibold text-gray-800">{displayName}</span>
              </div>
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
