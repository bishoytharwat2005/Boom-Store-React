import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          BOOM <span className="text-gray-900">STORE</span>
        </h1>


        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <ink className="cursor-pointer hover:text-blue-600 transition">
            Home
          </ink>
          <li className="cursor-pointer hover:text-blue-600 transition">
            Products
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition">
            About
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition">
            Contact
          </li>
        </ul>

        <Button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;