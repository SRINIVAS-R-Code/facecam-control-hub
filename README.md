# FaceCam Control Hub

A comprehensive React-based user dashboard for face detection, AI-powered camera controls, and employee monitoring system.

## 🚀 Features

### Core Functionality
- **Real-time Face Detection** - Advanced facial recognition with emotion analysis
- **Camera Management** - Live camera feeds with recording capabilities
- **AI Chat Assistant** - Intelligent conversational AI for user assistance
- **Sentiment Analysis** - Real-time emotion detection and monitoring
- **Time Tracking** - Automated work session monitoring
- **Break Suggestions** - AI-powered break recommendations based on facial expressions

### Dashboard Sections
- **Dashboard** - Main overview with camera controls and system status
- **Face Detection** - Dedicated face recognition interface
- **Recording** - Video recording and capture features
- **Analytics** - Performance metrics and insights
- **AI Chat** - Conversational AI assistant
- **Sentiment Analysis** - Emotion monitoring dashboard
- **System Health** - Real-time system monitoring
- **Settings** - Configuration and preferences

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Face Detection**: face-api.js (TensorFlow.js)
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SRINIVAS-R-Code/facecam-control-hub.git
   cd facecam-control-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:8081
   - Login with: `user` / `user123`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_TITLE=FaceCam Control Hub
```

### Backend Integration
This frontend connects to the Django backend API running on port 8000. Make sure the backend is running for full functionality.

## 🎯 Key Components

### Face Detection System
- Real-time camera access with WebRTC
- 68-point facial landmark detection
- Emotion recognition (happy, sad, angry, etc.)
- Confidence scoring and validation

### AI Features
- **Break Suggestions**: Automatically detects fatigue and suggests breaks
- **Sentiment Monitoring**: Tracks emotional states during work sessions
- **AI Chat**: Context-aware conversational assistant
- **Smart Analytics**: Performance insights and recommendations

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern dark UI with glassmorphism effects
- **Sidebar Navigation**: Intuitive navigation with icons
- **Real-time Updates**: Live data synchronization

## 🔐 Authentication

The application integrates with a unified authentication system:
- **Login Portal**: http://localhost:8081
- **User Credentials**: `user` / `user123`
- **Admin Credentials**: `admin` / `admin123` (redirects to admin dashboard)

## 📊 API Integration

Connects to Django REST API endpoints:
- `/api/attendance/` - Attendance records
- `/api/employees/` - Employee data
- `/api/analytics/` - Performance analytics
- `/api/system/health/` - System monitoring
- `/api/face-recognition/` - Face recognition services

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation in the main project repository
- Contact the development team

## 🔄 Related Projects

- **Backend API**: Django REST API for data management
- **Admin Dashboard**: Enterprise attendance management system
- **Python Engine**: OpenCV-based face recognition service

---

**FaceCam Control Hub** - Advanced AI-powered employee monitoring and face detection system.
