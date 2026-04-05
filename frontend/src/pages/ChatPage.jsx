import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Chatbot from '../components/Chatbot'
import { useWeatherContext } from '../context/WeatherContext'

function ChatPage() {
  const { selectedCity, updateSelectedCity } = useWeatherContext()
  const [city, setCity] = useState(selectedCity)

  return (
    <div className="space-y-4">
      <section className="glass-panel rounded-3xl p-5">
        <h1 className="font-display text-3xl font-bold">Smart AI Chat</h1>
        <p className="mt-1 text-sm text-white/75">Ask weather-driven questions and get contextual recommendations.</p>

        <div className="mt-4">
          <SearchBar
            city={city}
            onCityChange={setCity}
            onSearch={(event) => {
              event.preventDefault()
              if (city.trim()) {
                updateSelectedCity(city.trim())
              }
            }}
            onLocate={() => {}}
            loading={false}
            showLocate={false}
          />
        </div>
      </section>

      <div className="glass-panel rounded-3xl p-4">
        <Chatbot city={selectedCity || city} fixed={false} />
      </div>
    </div>
  )
}

export default ChatPage
