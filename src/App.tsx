import { useState } from "react";
import Chart from "./components/Chart";
import { SineWaveData } from "./types/types";
import { FaExpand, FaCompress, FaChevronDown, FaChevronUp } from "react-icons/fa";

function App() {
  const [data, setData] = useState<SineWaveData[]>([]);
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(50);
  const [duration, setDuration] = useState(1);
  const [sampleRate, setSampleRate] = useState(400);
  const [waveType, setWaveType] = useState("Sine");
  const [customFormula, setCustomFormula] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${waveType.toLowerCase()}_wave?amplitude=${amplitude}&frequency=${frequency}&duration=${duration}&sampleRate=${sampleRate}&customFormula=${encodeURIComponent(customFormula)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: SineWaveData[] = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onGenerateWaveform = () => {
    // check what my current waveform type is
    setIsSettingsCollapsed(true);
    fetchData();
  }

  return (
    <div className="w-full p-6 space-y-6 bg-gray-100 min-h-screen font-mono">
      <div className="bg-white shadow-lg w-full rounded-lg p-6 border-2 border-gray-300 relative overflow-hidden">
        <button
          onClick={() => setIsSettingsCollapsed(!isSettingsCollapsed)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          {isSettingsCollapsed ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
        </button>
        {!isSettingsCollapsed && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">Waveform Generator</h2>
            <div className="space-y-2 relative z-10">
              <label htmlFor="waveType" className="block text-sm font-medium text-gray-700">
                Wave Type
              </label>
              <select
                id="waveType"
                value={waveType}
                onChange={(e) => setWaveType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-2"
              >
                <option value="Sine">Sine</option>
                <option value="Triangle">Triangle</option>
                <option value="Rectangular">Rectangular</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            {waveType !== "Custom" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="amplitude" className="block text-sm font-medium text-gray-700">
                    Amplitude (A): {amplitude}
                  </label>
                  <input
                    type="range"
                    id="amplitude"
                    min={0}
                    max={10}
                    step={0.1}
                    value={amplitude}
                    onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Frequency (f) Hz: {frequency}
                  </label>
                  <input
                    type="range"
                    id="frequency"
                    min={1}
                    max={100}
                    step={1}
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (t) seconds
                  </label>
                  <input
                    type="number"
                    id="duration"
                    min={0.1}
                    step={0.1}
                    value={duration}
                    onChange={(e) => {
                      const value = e.target.value.replace(',', '.');
                      setDuration(parseFloat(value));
                    }}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sampleRate" className="block text-sm font-medium text-gray-700">
                    Sample Rate (fs) Hz
                  </label>
                  <input
                    type="number"
                    id="sampleRate"
                    min={1}
                    step={1}
                    value={sampleRate}
                    onChange={(e) => setSampleRate(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2 relative z-10">
                <label htmlFor="customFormula" className="block text-sm font-medium text-gray-700">
                  Custom Formula
                </label>
                <input
                  type="text"
                  id="customFormula"
                  value={customFormula}
                  onChange={(e) => setCustomFormula(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-md p-2"
                />
              </div>
            )}

            <button
              onClick={onGenerateWaveform}
              className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded relative z-10"
            >
              Generate Waveform
            </button>
          </>
        )}
      </div>

      <div className={`bg-white shadow-lg w-full rounded-lg p-6 border-2 border-gray-300 relative overflow-hidden ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-50' : ''}`}>
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          {isFullScreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
        <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-l border-gray-300 h-full"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-6 gap-4 pointer-events-none opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-gray-300 w-full"></div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">Waveform Display</h2>
        <Chart data={data} />
      </div>
    </div>
  );
}

export default App;
