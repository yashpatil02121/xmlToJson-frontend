# XML to JSON Converter

A modern React-based frontend application for converting XML files to JSON format. This application provides an intuitive interface for users to upload XML files and receive JSON output with download capabilities.

## Features

- **File Upload**: Drag and drop or browse to select XML files
- **Real-time Conversion**: Convert XML to JSON using a backend API
- **Download Support**: Download converted JSON files
- **Sample Data**: Download test XML file for demonstration
- **Modern UI**: Beautiful gradient interface with responsive design
- **Error Handling**: Graceful error handling for invalid files or API failures

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Backend**: REST API (hosted on Render)

## Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yashpatil02121/xmlToJson-frontend.git
cd xmltojson-frontend
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Development

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application for production:

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build
```

Preview the production build:

```bash
# Using npm
npm run preview

# Using yarn
yarn preview

# Using pnpm
pnpm preview
```

## Linting

Run ESLint to check code quality:

```bash
# Using npm
npm run lint

# Using yarn
yarn lint

# Using pnpm
pnpm lint
```

## API Endpoints

### Backend API

The frontend communicates with a backend API hosted on Render for XML to JSON conversion.

#### POST `/api/xmlToJson`

Converts an uploaded XML file to JSON format.

**Endpoint**: `https://xmltojson-backend.onrender.com/api/xmlToJson`

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Request Body**:
- `file`: XML file to be converted (required)

**Response**:
```json
{
  "output": {
    // Converted JSON object
  }
}
```

**Example Request**:
```javascript
const formData = new FormData();
formData.append('file', xmlFile);

const response = await fetch('https://xmltojson-backend.onrender.com/api/xmlToJson', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

**Success Response (200)**:
```json
{
  "output": {
    "library": {
      "@name": "Central Library",
      "@established": "1892",
      "books": {
        "book": [
          {
            "@id": "001",
            "@available": "true",
            "description": "A thrilling tale of discovery and courage in the Amazon rainforest."
          },
          {
            "@id": "002",
            "@available": "false",
            "title": "Learning & Growing",
            "author": "Dr. Robert Johnson",
            "isbn": "978-0987654321",
            "genre": "Education",
            "pages": "156",
            "description": "Essential techniques for personal development.",
            "tags": {
              "tag": ["self-help", "psychology", "education"]
            }
          }
        ]
      }
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid XML file or malformed request
- `500 Internal Server Error`: Server-side processing error

## Project Structure

```
xmltojson-frontend/
├── public/
│   ├── tags2braceslogo.png    # Application logo
│   ├── test.xml              # Sample XML file for testing
│   └── vite.svg              # Vite logo
├── src/
│   ├── components/
│   │   ├── AppBar.tsx        # Navigation header component
│   │   └── ShinyText.jsx     # Animated text component
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   ├── index.css             # Global styles
│   └── App.css               # App-specific styles
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## Usage

1. **Upload XML File**: Click the file input or drag and drop an XML file
2. **Convert**: Click "Convert to JSON" to process the file
3. **View Results**: JSON output will be displayed in a formatted code block
4. **Download**: Click "Download JSON" to save the converted file
5. **Test**: Use "Download Test XML" to get a sample XML file

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
