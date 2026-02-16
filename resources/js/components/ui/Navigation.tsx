import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { href: '/novosti', label: 'Новости' },
  { href: '/proekty', label: 'Проекты' },
  { href: '/programma-peredach', label: 'Программа передач' },
  { href: '/arhiv', label: 'Архив' },
];

const onlineLink = { href: '/online', label: 'Онлайн' };

const Navigation = () => {
  const { url } = usePage();

  const isActive = (href: string) => {
    const currentPath = url.split('?')[0];
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="mr-8 flex items-center space-x-2 group transition-transform duration-150 active:scale-95"
        >
          <span className="font-semibold text-xl tracking-tight text-foreground select-none">Insport</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-3">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={isActive(item.href)}>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-base font-medium rounded-full px-4 py-2',
                        isActive(item.href)
                          ? 'text-foreground bg-accent/60 shadow-sm'
                          : 'text-muted-foreground bg-transparent',
                        'hover:bg-accent/40 hover:text-foreground transition-colors duration-150'
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Online Button */}
          <Button
            asChild
            className={cn(
              'h-10 px-5 rounded-full font-semibold text-base shadow-none border-none',
              isActive(onlineLink.href)
                ? 'bg-red-700 text-white hover:bg-red-800'
                : 'bg-red-600 text-white hover:bg-red-700',
              'transition-colors duration-150'
            )}
          >
            <Link href={onlineLink.href}>{onlineLink.label}</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Button
            asChild
            size="sm"
            className={cn(
              'rounded-full font-semibold text-base shadow-none border-none mr-2',
              isActive(onlineLink.href)
                ? 'bg-red-700 text-white hover:bg-red-800'
                : 'bg-red-600 text-white hover:bg-red-700',
              'transition-colors duration-150'
            )}
          >
            <Link href={onlineLink.href}>{onlineLink.label}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-border/60 bg-background/80 hover:bg-accent/30 transition-colors duration-150"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background/95">
              <SheetHeader className="mb-4 border-b pb-4">
                <SheetTitle>
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center space-x-2 group transition-transform duration-150 active:scale-95"
                    >
                      <span className="font-semibold text-xl tracking-tight text-foreground select-none">Insport</span>
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium rounded-full px-4 py-2",
                        "transition-colors duration-150 hover:bg-accent/40 hover:text-foreground",
                        isActive(item.href)
                          ? "bg-accent/60 text-foreground font-semibold"
                          : "text-muted-foreground"
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;