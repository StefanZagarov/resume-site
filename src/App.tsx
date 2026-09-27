import { useEffect } from 'react'
import { DotField } from './components/DotField'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { startPointerTracking } from './hooks/usePointer'
import { About } from './sections/About'
import { Certificates } from './sections/Certificates'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

function App() {
  useEffect(() => {
    startPointerTracking()
  }, [])

  return (
    <>
      <DotField />
      <Nav />
      <main className="page">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
