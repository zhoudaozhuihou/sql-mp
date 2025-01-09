'use client'
import { useState } from 'react'
import {
  Paper,
  Typography,
  Chip,
  Tab,
  Tabs,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from '@mui/material'
import { ContentCopy, Edit, Check, Close } from '@mui/icons-material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ApiDoc() {
  const [activeTab, setActiveTab] = useState(0)
  const [editingParam, setEditingParam] = useState(null)
  const [parameters, setParameters] = useState([
    {
      name: 'client_id',
      type: 'string',
      required: true,
      description: 'Your API client ID',
      example: 'client_123456'
    },
    {
      name: 'client_secret',
      type: 'string',
      required: true,
      description: 'Your API client secret',
      example: 'secret_abcdef'
    }
  ])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleEditParam = (param) => {
    setEditingParam({
      ...param,
      tempDescription: param.description,
      tempExample: param.example
    })
  }

  const handleSaveParam = () => {
    setParameters(parameters.map(p => 
      p.name === editingParam.name 
        ? { ...p, description: editingParam.tempDescription, example: editingParam.tempExample }
        : p
    ))
    setEditingParam(null)
  }

  const handleCancelEdit = () => {
    setEditingParam(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Chip 
            label="GET TOKEN" 
            color="primary"
            className="font-medium"
          />
          <Chip 
            label="Published" 
            color="success"
            variant="outlined"
            className="font-medium"
          />
        </div>
        <Typography variant="h4" className="mb-2">
          Get Access Token
        </Typography>
        <Typography color="text.secondary">
          Obtain an access token for API authentication
        </Typography>
      </div>

      <Paper className="mb-8">
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-900">
          <code className="text-sm flex-grow">
            https://api.example.com/v1/oauth/token
          </code>
          <IconButton size="small" className="text-gray-500 hover:text-gray-700">
            <ContentCopy fontSize="small" />
          </IconButton>
        </div>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          className="bg-white dark:bg-gray-800"
        >
          <Tab label="Parameters" />
          <Tab label="Response" />
          <Tab label="Errors" />
        </Tabs>
      </Box>

      <div className="mt-6">
        {activeTab === 0 && (
          <div className="space-y-6">
            <section>
              <Typography variant="h6" gutterBottom>
                Headers
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Content-Type</TableCell>
                    <TableCell>application/x-www-form-urlencoded</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section>
              <Typography variant="h6" gutterBottom>
                Body Parameters
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Required</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Example</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parameters.map((param) => (
                    <TableRow key={param.name}>
                      <TableCell>{param.name}</TableCell>
                      <TableCell>{param.type}</TableCell>
                      <TableCell>{param.required ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        {editingParam?.name === param.name ? (
                          <TextField
                            value={editingParam.tempDescription}
                            onChange={(e) => setEditingParam({
                              ...editingParam,
                              tempDescription: e.target.value
                            })}
                            size="small"
                            fullWidth
                          />
                        ) : (
                          param.description
                        )}
                      </TableCell>
                      <TableCell>
                        {editingParam?.name === param.name ? (
                          <TextField
                            value={editingParam.tempExample}
                            onChange={(e) => setEditingParam({
                              ...editingParam,
                              tempExample: e.target.value
                            })}
                            size="small"
                            fullWidth
                          />
                        ) : (
                          param.example
                        )}
                      </TableCell>
                      <TableCell>
                        {editingParam?.name === param.name ? (
                          <div className="flex gap-1">
                            <IconButton size="small" onClick={handleSaveParam}>
                              <Check fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={handleCancelEdit}>
                              <Close fontSize="small" />
                            </IconButton>
                          </div>
                        ) : (
                          <IconButton size="small" onClick={() => handleEditParam(param)}>
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-6">
            <section>
              <Typography variant="h6" gutterBottom>
                Response Fields
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>access_token</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>The access token to use for API requests</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>token_type</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>The type of token (usually "Bearer")</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>expires_in</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>Number of seconds until the token expires</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section>
              <Typography variant="h6" gutterBottom>
                Example Response
              </Typography>
              <Paper className="overflow-hidden">
                <SyntaxHighlighter 
                  language="json" 
                  style={tomorrow}
                  className="!m-0"
                >
                  {JSON.stringify({
                    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    token_type: "Bearer",
                    expires_in: 3600
                  }, null, 2)}
                </SyntaxHighlighter>
              </Paper>
            </section>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-6">
            <section>
              <Typography variant="h6" gutterBottom>
                Error Codes
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>400</TableCell>
                    <TableCell>invalid_request</TableCell>
                    <TableCell>Invalid request parameters</TableCell>
                    <TableCell>The request is missing required parameters or contains invalid values</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>401</TableCell>
                    <TableCell>invalid_client</TableCell>
                    <TableCell>Invalid client credentials</TableCell>
                    <TableCell>The provided client_id or client_secret is invalid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>429</TableCell>
                    <TableCell>too_many_requests</TableCell>
                    <TableCell>Rate limit exceeded</TableCell>
                    <TableCell>Too many token requests. Please try again later</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section>
              <Typography variant="h6" gutterBottom>
                Error Response Example
              </Typography>
              <Paper className="overflow-hidden">
                <SyntaxHighlighter 
                  language="json" 
                  style={tomorrow}
                  className="!m-0"
                >
                  {JSON.stringify({
                    error: "invalid_client",
                    error_description: "The provided client credentials are invalid",
                    status: 401
                  }, null, 2)}
                </SyntaxHighlighter>
              </Paper>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

