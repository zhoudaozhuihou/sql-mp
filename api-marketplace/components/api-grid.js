'use client'

import { styled } from '@mui/material/styles'
import { Pagination } from '@mui/material'
import { Alert } from '@mui/material'
import { ApiCard, ApiCardSkeleton } from './api-card'

const Root = styled('div')(({ theme }) => ({
  overflowY: 'auto',
  paddingRight: theme.spacing(2),
}))

const GridContent = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}))

const PaginationWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(2, 0),
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 200,
}))

export function ApiGrid({ 
  apis = [], 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false,
  error = null
}) {
  if (error) {
    return (
      <StyledAlert severity="error">
        {error}
      </StyledAlert>
    )
  }

  if (isLoading) {
    return (
      <Root>
        <GridContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <ApiCardSkeleton key={index} />
          ))}
        </GridContent>
      </Root>
    )
  }

  if (!apis || apis.length === 0) {
    return (
      <StyledAlert severity="info">
        No APIs found
      </StyledAlert>
    )
  }

  return (
    <Root>
      <GridContent>
        {apis.map((api) => (
          <ApiCard key={api.id} {...api} />
        ))}
      </GridContent>
      {totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            shape="rounded"
          />
        </PaginationWrapper>
      )}
    </Root>
  )
}

