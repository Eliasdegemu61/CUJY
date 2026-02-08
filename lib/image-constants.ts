// Favicon - Ninja character (black circle with white eyes and smile)
export const FAVICON_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIyNDgiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTcwIiBjeT0iMjQwIiByeD0iNDUiIHJ5PSI2MCIgZmlsbD0iI2ZmZmZmZiIvPjxlbGxpcHNlIGN4PSIzNDIiIGN5PSIyNDAiIHJ4PSI0NSIgcnk9IjYwIiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTSAxNjAgMzIwIFEgMjU2IDM4MCAzNTIgMzIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==';

// Grenade image for footer (simplified 3D grenade representation)
export const GRENADE_IMAGE_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMTAwIiB5PSIxMjAiIGZvbnQtc2l6ZT0iODAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZWE1ODBjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5OAPC90ZXh0Pjwvc3ZnPg==';

// Helper function to create inline image data
export const createImageDataURI = (base64String: string, format: 'png' | 'jpg' | 'svg' = 'png'): string => {
  if (format === 'svg') {
    return `data:image/svg+xml;base64,${base64String}`;
  }
  return `data:image/${format};base64,${base64String}`;
};
