'use client'

import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip,
  Tooltip,
  styled
} from '@mui/material'
import { Check, Clock, Users, User, Link2, ShoppingCart, Play, AlertCircle, Info } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useState, useCallback } from 'react'

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}))

const CardHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}))

const HeaderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 8,
})

const ChipsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
  marginTop: theme.spacing(1),
}))

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}))

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
}))

const ButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}))

const ErrorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  color: theme.palette.error.main,
  padding: theme.spacing(2),
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: theme.spacing(1),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '2.4em',
}))

const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  marginBottom: theme.spacing(1),
  minHeight: '3.6em',
}))

export function ApiCard({
  title,
  version,
  description,
  category,
  createdAt,
  updatedAt,
  creator,
  team,
  isPurchased,
  isExternal = false,
  price,
}) {
  const [error, setError] = useState(null)

  const formatDate = useCallback((date) => {
    try {
      return formatDistanceToNow(new Date(date))
    } catch (err) {
      setError('Error formatting date')
      return 'Invalid date'
    }
  }, [])

  if (error) {
    return (
      <StyledCard>
        <ErrorContainer>
          <AlertCircle className="w-4 h-4" />
          <Typography color="error">{error}</Typography>
        </ErrorContainer>
      </StyledCard>
    )
  }

  return (
    <StyledCard>
      <CardHeader>
        <HeaderRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CardTitle>
              <Tooltip title={title} placement="top">
                <span>{title}</span>
              </Tooltip>
            </CardTitle>
            <ChipsContainer>
              <Chip
                label={version}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={category}
                size="small"
                variant="outlined"
              />
              {isExternal && (
                <Chip
                  icon={<Link2 className="w-4 h-4" />}
                  label="External API"
                  size="small"
                />
              )}
              {isPurchased && (
                <Chip
                  icon={<Check className="w-4 h-4" />}
                  label="Purchased"
                  size="small"
                  color="primary"
                />
              )}
            </ChipsContainer>
          </div>
        </HeaderRow>
        <CardDescription>
          <Tooltip title={description} placement="top">
            <span>{description}</span>
          </Tooltip>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <InfoRow>
          <Tooltip title={creator}>
            <InfoText>
              <User className="w-4 h-4" />
              {creator}
            </InfoText>
          </Tooltip>
          <Tooltip title={team}>
            <InfoText>
              <Users className="w-4 h-4" />
              {team}
            </InfoText>
          </Tooltip>
        </InfoRow>
        
        <InfoRow>
          <Tooltip title={`Created ${formatDate(createdAt)} ago`}>
            <InfoText>
              <Clock className="w-4 h-4" />
              Created {formatDate(createdAt)} ago
            </InfoText>
          </Tooltip>
        </InfoRow>
        
        <InfoRow>
          <Tooltip title={`Updated ${formatDate(updatedAt)} ago`}>
            <InfoText>
              <Clock className="w-4 h-4" />
              Updated {formatDate(updatedAt)} ago
            </InfoText>
          </Tooltip>
        </InfoRow>

        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Info className="w-4 h-4" />}
          >
            View Details
          </Button>
          
          {!isExternal && !isPurchased && (
            <ButtonGroup>
              {price !== 'Custom' && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<Play className="w-4 h-4" />}
                  style={{ flex: 1 }}
                >
                  Try Demo
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<ShoppingCart className="w-4 h-4" />}
                style={{ flex: 1 }}
              >
                {price === 'Custom' ? 'Contact Sales' : 'Purchase'}
              </Button>
            </ButtonGroup>
          )}
        </ButtonContainer>
      </CardContent>
    </StyledCard>
  )
}

export function ApiCardSkeleton() {
  return (
    <StyledCard>
      <CardHeader>
        <HeaderRow>
          <div style={{ flex: 1 }}>
            <Typography variant="h6" component="div">
              <Typography variant="skeleton" width="80%" height={24} />
            </Typography>
            <ChipsContainer>
              <Typography variant="skeleton" width={60} height={24} />
              <Typography variant="skeleton" width={80} height={24} />
            </ChipsContainer>
          </div>
        </HeaderRow>
        <Typography variant="skeleton" width="100%" height={60} />
      </CardHeader>

      <CardContent>
        <InfoRow>
          <Typography variant="skeleton" width="40%" />
          <Typography variant="skeleton" width="40%" />
        </InfoRow>
        <InfoRow>
          <Typography variant="skeleton" width="60%" />
        </InfoRow>
        <InfoRow>
          <Typography variant="skeleton" width="60%" />
        </InfoRow>
        <ButtonContainer>
          <Typography variant="skeleton" width="100%" height={36} />
          <ButtonGroup>
            <Typography variant="skeleton" width="48%" height={36} />
            <Typography variant="skeleton" width="48%" height={36} />
          </ButtonGroup>
        </ButtonContainer>
      </CardContent>
    </StyledCard>
  )
}

