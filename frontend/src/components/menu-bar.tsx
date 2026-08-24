import React from 'react';
import { Leaf } from 'lucide-react';

interface MenuBarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = () => {
  return <div className="w-full h-[58px]">uwu</div>;
};
