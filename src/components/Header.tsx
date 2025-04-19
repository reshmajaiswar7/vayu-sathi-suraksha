
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Thermometer, Droplet, Info } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const Header = ({ location, onLocationChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container py-4 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center text-skyblue-dark">
              <Thermometer className="h-6 w-6 mr-2" />
              <Droplet className="h-6 w-6" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-skyblue-dark">VayuMeter</h1>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={location} onValueChange={onLocationChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mumbai, Maharashtra">Mumbai, Maharashtra</SelectItem>
                <SelectItem value="Bhubaneswar, Odisha">Bhubaneswar, Odisha</SelectItem>
              </SelectContent>
            </Select>
            <nav className="flex space-x-4 ml-6">
              <Button variant="ghost" className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                About
              </Button>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} aria-label="Menu">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Select value={location} onValueChange={onLocationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai, Maharashtra">Mumbai, Maharashtra</SelectItem>
                  <SelectItem value="Bhubaneswar, Odisha">Bhubaneswar, Odisha</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" className="justify-start">
                <Info className="mr-2 h-4 w-4" />
                About
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
