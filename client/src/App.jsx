import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [view, setView] = useState('home');

  return (
    <>
      <div className = 'portfolio'>
        <nav>
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('about')}>About Me</button>
          <button onClick={() => setView('resume')}>Resume</button>
          <button onClick={() => setView('links')}>Links/Contact</button>
        </nav>

        <main className='main-content'>
          {view === 'home' && (
            <section className='intro'>
              <h1>It's nice to meet you!</h1>
              <h2> I'm Paul Miller. Feel free to look around for info about me!</h2>
            </section>) 
            }
          
          {view === 'about' && (
            <section>
            <h2>About Me</h2>
            <p> Hello! I'm Paul Miller, a recent graduate of the University of Virginia with a Bachelor's in Computer Science.
            </p>
            <p> Working with technology has always been my #1 hobby. From video games to databases to tinkering with handheld devices, 
              I've always loved the versatility that computers have to offer.
              In my time in college and through work experiences such as my time in Americorps,
              I've realized the importance of combining my passions and things I find important with my growing skillset.
              Much of my time now is spent on learning how to be effective in serving my community,
              engaging with my interests (sports, nutrition, games, etc.), and serving the organizations I am a part of.
            </p>
            <p>
              If there are any available opportunities that may allow me to apply my efforts to your organization, please let me know!
              I look forward to hearing from you!
            </p>
              <a href="mailto:pauljwmiller@gmail.com">
              Send an email to pauljwmiller@gmail.com
              </a>
            </section>)
          }

          {view === 'resume' && (
            <section className="resume-display">
              <h2> My Resume:</h2>
              <a href="/resume.pdf" download className="download-button">
              Download as PDF
              </a>
              <embed
                src = "/resume.pdf"
                type="application/pdf"
                width="150%"
                height='620px'
              />
            </section>)
          }

          {view === 'links' && (
            <section className='links-display'>
              <h2><a href="https://github.com/pauljwmiller" className='active-link'>
                <p>GitHub</p>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                  alt="GitHub Logo" 
                  width="50px"
                  height="50px"
                />
              </a></h2>
              <h2><a href="https://www.linkedin.com/in/paul-miller-841907246/" className='active-link'>
                <p>LinkedIn</p>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
                  alt="LinkedIn Logo" 
                  width="50px"
                  height="50px"
                />
              </a></h2>
              <h2><a href="https://pmiller-brmc.github.io/" className='active-link'>
                <p>GIS Project for Blue Ridge Medical Center</p>
                <img
                  src="https://www.brmedical.org/wp-content/uploads/2023/11/BRMC-logo-blue-white-icon.png"
                  alt="Blue Ridge Medical Center Logo"
                  width="75px"
                  height="50px"
                />
              </a></h2>
              <h2><a href="mailto:pauljwmiller@gmail.com" className='active-link'>
                <p>Email</p>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/542/542689.png"
                  alt = "Email Icon"
                  width="50px"
                  height="50px"
                  />
              </a></h2>
            </section>
          )
          }
        </main>

      </div>
    </>
  )
}

export default App
