# AI Weather Assistant

Production-style AI weather SaaS with authentication, personalized dashboard, forecast analytics, saved cities, and Gemini-powered insights/chat.

## Stack

- Frontend: React + React Router + Tailwind CSS + Recharts
- Backend: Node.js + Express + Mongoose
- Auth: JWT + bcrypt
- AI: Gemini API
- Weather: OpenWeatherMap API

## Core Modules

- Authentication: signup/login, JWT session, protected routes
- Dashboard: greeting, current weather, quick actions, saved city preview
- Smart AI Chat: contextual answers using selected-city weather context
- Forecast: 5-day cards + chart trend visualization
- Saved Cities: save, list, remove, and one-click city selection
- Weather Insights: AI-generated clothing, travel, and health recommendations

## Backend Structure

```text
backend/src/
  config/
    db.js
  controllers/
    authController.js
    chatController.js
    insightsController.js
    savedCityController.js
    weatherController.js
  middlewares/
    authMiddleware.js
    validateRequest.js
  models/
    User.js
  routes/
    authRoutes.js
    chatRoutes.js
    insightsRoutes.js
    savedCityRoutes.js
    weatherRoutes.js
  services/
    insightsPromptService.js
    llmService.js
    promptService.js
    weatherService.js
  utils/
    ApiError.js
    asyncHandler.js
    errorHandler.js
  app.js
  server.js
```

## Frontend Structure

```text
frontend/src/
  components/
    Chatbot.jsx
    ChatBubble.jsx
    DarkModeToggle.jsx
    ForecastChart.jsx
    Loader.jsx
    Navbar.jsx
    ProtectedRoute.jsx
    SearchBar.jsx
    WeatherCard.jsx
    WeatherInsights.jsx
  context/
    AuthContext.jsx
    WeatherContext.jsx
  hooks/
    useTheme.js
  layouts/
    AppLayout.jsx
  pages/
    AuthPageShell.jsx
    ChatPage.jsx
    DashboardPage.jsx
    ForecastPage.jsx
    LoginPage.jsx
    SavedCitiesPage.jsx
    SignupPage.jsx
  services/
    api.js
  utils/
    weatherTheme.js
  App.jsx
  main.jsx
```

## Environment Setup

Create `backend/.env` from `backend/.env.example` and set:

- PORT=5000
- CLIENT_URL=http://localhost:5173
- MONGODB_URI=mongodb://127.0.0.1:27017/ai-weather-assistant
- JWT_SECRET=your_long_random_secret
- JWT_EXPIRES_IN=7d
- OPENWEATHER_API_KEY=your_openweather_api_key
- GEMINI_API_KEY=your_gemini_api_key
- GEMINI_MODEL=gemini-2.5-flash

Create `frontend/.env` from `frontend/.env.example`:

- VITE_API_BASE_URL=http://localhost:5000/api

## Run Locally

1. Install dependencies:

```bash
cd backend
npm install
cd ../frontend
npm install
```

2. Start MongoDB:

- Local MongoDB service, or
- Use MongoDB Atlas URI in `MONGODB_URI`

3. Start backend:

```bash
cd backend
npm run dev
```

4. Start frontend:

```bash
cd frontend
npm run dev
```

## API Endpoints

Public:

- POST /api/signup
- POST /api/login
- GET /api/weather?city=
- GET /api/weather?lat=&lon=
- GET /api/forecast?city=

Protected (JWT bearer token required):

- GET /api/me
- POST /api/chat
- POST /api/insights
- POST /api/save-city
- GET /api/saved-cities
- DELETE /api/remove-city/:cityId

## Security Notes

- API keys remain backend-only
- Passwords hashed with bcrypt
- JWT checked in middleware for protected resources
- Request body validation via express-validator
- API errors normalized with consistent JSON format
