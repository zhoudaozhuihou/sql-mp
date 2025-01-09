import { AppBar, IconButton, Toolbar } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'

export default function Navbar({ onThemeToggle, mode }) {
  return (
    <AppBar position="fixed" className="transition-all duration-200">
      <Toolbar>
        <div className="flex-grow" />
        <IconButton color="inherit" onClick={onThemeToggle}>
          {mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

