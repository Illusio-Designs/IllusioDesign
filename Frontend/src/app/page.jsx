'use client'

import { useState, useEffect } from 'react'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

export default function Page() {
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname)

    // Handle browser navigation
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleNavigation)
    
    // Custom navigation handler for links
    const handleClick = (e) => {
      const target = e.target.closest('a')
      if (target && target.href.startsWith(window.location.origin)) {
        e.preventDefault()
        const newPath = new URL(target.href).pathname
        window.history.pushState({}, '', newPath)
        setCurrentPath(newPath)
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Route mapping
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />
      case '/services':
        return <Services />
      case '/about':
        return <About />
      case '/contact':
        return <Contact />
      default:
        // 404 - redirect to home
        return <Home />
    }
  }

  return renderPage()
}
