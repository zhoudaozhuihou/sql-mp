'use client'

import { useState } from 'react'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TableOfContents from './TableOfContents'
import Navbar from './Navbar'

export default function Layout({ children }) {
  const [mode, setMode] = useState('light')
  const isMobile = useMediaQuery('(max-width:1024px)')

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
    },
  })

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex h-screen">
        <Navbar onThemeToggle={toggleTheme} mode={mode} />
        <Box
          component="main"
          className="flex-grow p-6 transition-all duration-200"
        >
          <Box className="mt-16">
            <div className="container mx-auto flex gap-6">
              <div className="flex-grow">{children}</div>
              {!isMobile && (
                <div className="w-64 hidden xl:block">
                  <TableOfContents />
                </div>
              )}
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

