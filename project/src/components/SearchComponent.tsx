import React, { useState, useCallback, useRef } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Card, 
  CircularProgress,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import debounce from 'lodash.debounce';

interface ApiResult {
  id: string;
  name: string;
  category: string;
  description: string;
}

const CATEGORIES = ['All', 'REST', 'GraphQL', 'WebSocket', 'gRPC'];

export const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ApiResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Simulated API call
  const searchAPI = async (term: string): Promise<ApiResult[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (term) {
          resolve([
            { id: '1', name: `GET /users/${term}`, category: 'REST', description: 'Get user details' },
            { id: '2', name: `POST /data/${term}`, category: 'REST', description: 'Create new data' },
            { id: '3', name: `query ${term}`, category: 'GraphQL', description: 'GraphQL query' },
            { id: '4', name: `ws://${term}`, category: 'WebSocket', description: 'WebSocket endpoint' },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  };

  const debouncedSearch = useRef(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      try {
        const searchResults = await searchAPI(term);
        setResults(searchResults);
        setError(null);
      } catch (err) {
        setError('An error occurred while searching');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setIsLoading(true);
    debouncedSearch(term);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setResults([]);
    setError(null);
  }, []);

  const filteredResults = results.filter(result => 
    selectedCategory === 'All' || result.category === selectedCategory
  );

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 md:px-0">
      <TextField
        fullWidth
        variant="outlined"
        label="Search APIs"
        placeholder="Search for REST, GraphQL, WebSocket APIs..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: 'white', mb: 2 }}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {CATEGORIES.map(category => (
            <Tab 
              key={category} 
              label={category} 
              value={category}
            />
          ))}
        </Tabs>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Card sx={{ p: 2, bgcolor: '#FEE2E2' }}>
          <Typography color="error">{error}</Typography>
        </Card>
      )}

      {!isLoading && !error && searchTerm && filteredResults.length === 0 && (
        <Card sx={{ p: 2 }}>
          <Typography color="text.secondary">
            No APIs found for "{searchTerm}" in {selectedCategory} category
          </Typography>
        </Card>
      )}

      <Grid container spacing={2}>
        {!isLoading && !error && filteredResults.map((api) => (
          <Grid item xs={12} key={api.id}>
            <Card sx={{ 
              p: 2,
              '&:hover': { bgcolor: 'grey.50' },
              cursor: 'pointer'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {api.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {api.description}
              </Typography>
              <Typography variant="caption" sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1
              }}>
                {api.category}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};