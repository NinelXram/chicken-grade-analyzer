import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { initGemini } from '../config/gemini';
import { generateExcel, GradeData } from '../utils/excelUtils';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GradeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!file) {
      setError('Please provide an image file');
      return;
    }

    if (!GEMINI_API_KEY) {
      setError('Gemini API key is not configured. Please check your environment variables.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert image to base64
      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Initialize Gemini
      const model = initGemini(GEMINI_API_KEY);

      // Analyze image
      const result = await model.generateContent([
        "Analyze this grade table image and extract the following information in JSON format: stt (number), name (string), dob (string in DD/MM/YYYY format), class (string), dKt (float or empty, range 0.0-10.0), dGk (float or empty, range 0.0-10.0), dThi (float or empty, range 0.0-10.0). Return only the raw JSON data without any additional explanations or formatting",
        {
          inlineData: {
            mimeType: file.type,
            data: imageData.split(',')[1]
          }
        }
      ]);

      const response = await result.response.text()
      // const jsonData = JSON.parse(response.text());
      const startIndex = response.indexOf('[');
      const endIndex = response.lastIndexOf(']') + 1;
      const jsonData = JSON.parse(response.substring(startIndex, endIndex));


      // Generate Excel file
      const { blob, fileName } = generateExcel(jsonData as GradeData[]);

      // Download file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Grade Table Analyzer
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              mb: 3,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload">
              <Button
                component="span"
                variant="contained"
                startIcon={<CloudUpload />}
              >
                Upload Grade Table Image
              </Button>
            </label>
            {file && (
              <Typography sx={{ mt: 2 }}>
                Selected file: {file.name}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={analyzeImage}
            disabled={loading || !file}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyze and Generate Excel'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default GradeAnalyzer; 