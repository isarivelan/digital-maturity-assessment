# Digital Maturity Assessment Platform

A comprehensive AI-powered assessment tool for evaluating organizational digital maturity across five key dimensions: Strategy, Data & Analytics, Automation, Cybersecurity, and Workforce.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-14+-black.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)

## 🌟 Features

- **Interactive AI Assessment**: Conversational AI-guided assessment using Azure OpenAI
- **Five Key Dimensions**: Comprehensive evaluation across Strategy, Data & Analytics, Automation, Cybersecurity, and Workforce
- **Real-time Scoring**: Automated maturity level scoring (1-4) with detailed rationale
- **Visual Analytics Dashboard**: 
  - Spider/Radar charts for maturity visualization
  - Bar charts for dimension comparison
  - Pie charts for level distribution
  - Timeline charts for assessment trends
- **Best Practices & Examples**: Context-aware guidance for each dimension
- **Session Management**: Persistent assessment sessions with SQLite database
- **Progress Tracking**: Visual progress indicators and completion status

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Notifications**: React Hot Toast
- **State Management**: React Hooks (useState, useEffect)

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **AI Integration**: Azure OpenAI GPT-4
- **Database**: SQLite with raw SQL queries
- **API Design**: RESTful endpoints

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **Python**: 3.8 or higher
- **Azure OpenAI**: Valid API credentials

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/digital-maturity-assessment.git
cd digital-maturity-assessment
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn openai python-dotenv python-multipart

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=your_azure_openai_key
AZURE_OPENAI_API_VERSION=2024-02-15-preview
OPENAI_API_BASE_URL=https://your-resource.openai.azure.com/
DEPLOYMENT_NAME=your-deployment-name
ALLOWED_ORIGINS=http://localhost:3000
EOF

# Run backend
python main.py
```

Backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Run development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
digital-maturity-assessment/
│
├── backend/
│   ├── main.py              # FastAPI application
│   ├── assessment.db        # SQLite database (auto-generated)
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Assessment interface
│   │   ├── analytics/
│   │   │   └── page.tsx     # Analytics dashboard
│   │   └── layout.tsx       # Root layout
│   ├── lib/
│   │   └── api.ts           # API client functions
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🎯 Usage

### Starting an Assessment

1. Navigate to `http://localhost:3000`
2. The system automatically creates a new assessment session
3. Begin answering questions for each dimension
4. Use "Show Example" and "Best Practices" buttons for guidance
5. Submit assessment when ready to receive scoring

### Viewing Analytics

1. Complete all 5 dimensions (progress must be 100%)
2. Click the "Dashboard" button in the top-right corner
3. View comprehensive analytics including:
   - Total sessions and assessments
   - Maturity radar chart
   - Dimension comparisons
   - Level distribution
   - Assessment timeline

### API Endpoints

#### Assessment Endpoints
- `POST /api/assessment/start` - Start new assessment session
- `GET /api/dimensions` - Get all dimensions
- `POST /api/chat` - Send message in assessment
- `POST /api/score` - Score a dimension
- `GET /api/examples/{dimension}` - Get example answers
- `GET /api/best-practices/{dimension}` - Get best practices

#### Analytics Endpoints
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/scores` - Get all scores
- `GET /api/session/{session_id}` - Get session details

## 🗄️ Database Schema

### Sessions Table
```sql
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    current_dimension TEXT NOT NULL,
    completed_dimensions TEXT DEFAULT '[]'
)
```

### Messages Table
```sql
CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    dimension TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
)
```

### Scores Table
```sql
CREATE TABLE scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    dimension TEXT NOT NULL,
    level INTEGER NOT NULL,
    rationale TEXT NOT NULL,
    top_gaps TEXT NOT NULL,
    next_quarter_actions TEXT NOT NULL,
    scored_at TEXT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
)
```

## 📊 Maturity Levels

Each dimension is scored on a 4-level scale:

- **Level 1**: Ad-hoc, limited process/ownership
- **Level 2**: Pockets of success, emerging governance
- **Level 3**: Clear roadmap, standardized practices
- **Level 4**: Fully aligned with business goals, continuous improvement

## 🎨 Screenshots

### Assessment Interface
Interactive chat-based assessment with real-time AI guidance

### Analytics Dashboard
Comprehensive visualizations including spider charts, bar charts, and timelines

## 🔒 Security Considerations

- Environment variables for sensitive credentials
- CORS configuration for frontend-backend communication
- Session-based data isolation
- SQL injection prevention through parameterized queries

## 🛠️ Development

### Running Tests
```bash
# Backend tests (if implemented)
pytest

# Frontend tests (if implemented)
npm test
```

### Building for Production

**Backend:**
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Frontend:**
```bash
npm run build
npm start
```

## 📝 Configuration

### Environment Variables

**Backend (.env)**
```env
OPENAI_API_KEY=your_api_key
AZURE_OPENAI_API_VERSION=2024-02-15-preview
OPENAI_API_BASE_URL=https://your-resource.openai.azure.com/
DEPLOYMENT_NAME=gpt-4
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Azure OpenAI for AI capabilities
- Recharts for visualization components
- FastAPI for the robust backend framework
- Next.js team for the excellent React framework

## 📞 Support

For support, email misarivelan@gmail.com or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Export reports to PDF
- [ ] Comparison with industry benchmarks
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Advanced analytics and insights
- [ ] Integration with enterprise systems

## 📈 Version History

- **v2.0.0** - Analytics dashboard with visualizations
- **v1.0.0** - Initial release with assessment functionality

---

Built with ❤️ using Next.js, FastAPI, and Azure OpenAI
