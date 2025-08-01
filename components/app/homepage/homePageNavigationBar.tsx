import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const navStyle = "text-muted-foreground hover:text-foreground transition";

export default function HomePageNavigationBar() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full top-0 flex justify-between items-center bg-background/90 py-3 px-6 fixed backdrop-blur-md ">
      <h1>Logoooooooo</h1>
      <nav className="flex gap-8 items-center max-sm:hidden">
        <Link href={"#"} className={`${navStyle}`}>
          How It Works
        </Link>
        <Link href={"#"} className={`${navStyle}`}>
          Pricing
        </Link>
        <Link href={"#"} className={`${navStyle}`}>
          Reviews
        </Link>
      </nav>
      <section className="flex items-center gap-5 max-sm:hidden">
        <Button className="bg-transparent border-1 border-white cursor-pointer hover:bg-foreground hover:text-background">
          Login
        </Button>
        <Button>Get Started</Button>
      </section>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="sm:hidden">
          <Menu
            size={32}
            className={`cursor-pointer ${open ? "hidden" : ""}`}
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl">Logoaaaaa</SheetTitle>
            <SheetDescription className="flex flex-col gap-2 mt-4 text-left text-lg">
              <Link href={"#"} className={navStyle}>
                How It Works
              </Link>
              <Link href={"#"} className={navStyle}>
                Pricing
              </Link>
              <Link href={"#"} className={navStyle}>
                Reviews
              </Link>
            </SheetDescription>
            <Button className="bg-transparent border-1 border-white cursor-pointer hover:bg-foreground hover:text-background mt-6">
              Login
            </Button>
            <Button className="cursor-pointer">Get Started</Button>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
