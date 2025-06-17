'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CloudSun, Coins, Settings } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { name: 'Dashboard', href: '/', icon: <Home size={20} /> },
  { name: 'Weather', href: '/weather', icon: <CloudSun size={20} /> },
  { name: 'Crypto', href: '/crypto', icon: <Coins size={20} /> },
  { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-60 p-4 border-r border-white/10 bg-black/30 backdrop-blur-md flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-pink-500 tracking-widest">NEXUS</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                pathname === item.href ? 'bg-pink-500 text-black font-bold' : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <ThemeToggle />
    </aside>
  )
}
