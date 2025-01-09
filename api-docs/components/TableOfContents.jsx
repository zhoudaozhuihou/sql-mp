'use client'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Paper, Typography } from '@mui/material'

export default function TableOfContents() {
  const [activeId, setActiveId] = useState('')
  const [headings, setHeadings] = useState([])

  // Add mounted check
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3')).map((heading) => ({
      id: heading.id,
      text: heading.textContent,
      level: heading.tagName === 'H2' ? 2 : 3,
    }))
    setHeadings(elements)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    document.querySelectorAll('h2, h3').forEach((heading) => {
      observer.observe(heading)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Paper className="p-4 sticky top-24">
      <Typography variant="subtitle2" className="font-medium mb-2">
        On this page
      </Typography>
      <nav>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`
              block py-1 text-sm
              ${heading.level === 3 ? 'pl-4' : ''}
              ${
                activeId === heading.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </Paper>
  )
}

