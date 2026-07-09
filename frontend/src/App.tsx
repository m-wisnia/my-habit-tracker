import {MenuBar} from "@/components/menu-bar"
import { useState } from "react";
import './App.css'

function App() {
  // const [view, setView] = useState<string>('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" id="center">
      <MenuBar/>
    </div>
  )
}

export default App
