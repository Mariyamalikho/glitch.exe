import { motion } from 'framer-motion';
import { Map, MapPin, Navigation, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { episodes, locations } from '../data/world';
import type { LocationId } from '../types';
import { useGame } from '../state/GameProvider';

export function WorldMapPage() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [selectedLoc, setSelectedLoc] = useState<LocationId>('white-room');

  const loc = locations.find((l) => l.id === selectedLoc) || locations[0];
  const isVisited = state.visitedLocations.includes(selectedLoc);
  const totalCompleted = state.completedEpisodes.length;
  const isHealed = totalCompleted >= 20;

  function handleTravel(locationId: LocationId) {
    dispatch({ type: 'VISIT_LOCATION', locationId });
    const matchingEp = episodes.find((ep) => ep.location === locationId);
    if (matchingEp) {
      dispatch({ type: 'ADVANCE', lineId: matchingEp.startLine });
      navigate('/story');
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 text-cyan">
          <Map size={24} />
          <h2 className="font-display text-3xl uppercase tracking-wider text-slate-100">ECHO GRID WORLD MAP</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400 font-mono">
          Interactive subconscious topology. Locations heal and stabilize as Evaa recovers archived memories.
        </p>
      </div>

      {/* Map Canvas Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Interactive Map Visualizer */}
        <div className="relative min-h-[500px] rounded-2xl border border-cyan/30 bg-void-dark/95 p-6 backdrop-blur-md overflow-hidden flex items-center justify-center">
          {/* Cyberpunk Map Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* SVG Connecting Lines between Map Nodes */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {locations.map((locA, i) => {
              if (i === 0) return null;
              const prev = locations[i - 1];
              return (
                <line
                  key={locA.id}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${locA.x}%`}
                  y2={`${locA.y}%`}
                  stroke={state.visitedLocations.includes(locA.id) ? '#22D3EE' : '#ffffff20'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Map Location Nodes */}
          {locations.map((node) => {
            const visited = state.visitedLocations.includes(node.id);
            const isSelected = node.id === selectedLoc;

            return (
              <motion.button
                key={node.id}
                type="button"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => {
                  setSelectedLoc(node.id);
                }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center z-10 focus:outline-none"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                    isSelected
                      ? 'border-pink bg-pink text-white shadow-neon-pink scale-105'
                      : visited
                      ? 'border-cyan bg-cyan/20 text-cyan shadow-neon'
                      : 'border-white/20 bg-black/80 text-slate-500 hover:border-cyan'
                  }`}
                >
                  <MapPin size={20} className={isSelected ? 'animate-pulse text-white' : ''} />
                </div>

                <span
                  className={`mt-1 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-md ${
                    isSelected ? 'bg-pink text-white font-bold' : 'bg-black/70 text-slate-300'
                  }`}
                >
                  {node.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Location Info Card */}
        <div className="rounded-2xl border border-white/15 bg-void-dark/90 p-6 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan font-bold">
                {loc.systemName}
              </span>
              <h3 className="font-display text-2xl text-slate-100 mt-1">{loc.name}</h3>
              <p className="text-xs text-pink font-mono">{loc.subtitle}</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-body">
              {isHealed ? loc.healedDescription : loc.description}
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-xs space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>STABILITY:</span>
                <span className={isHealed ? 'text-green-400 font-bold' : 'text-yellow-400'}>
                  {isHealed ? 'STABILIZED (100%)' : 'CORRUPTED (35%)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VISITED:</span>
                <span className={isVisited ? 'text-cyan' : 'text-slate-500'}>
                  {isVisited ? 'YES' : 'NO'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleTravel(loc.id)}
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan bg-cyan/20 py-3 font-display text-xs uppercase tracking-widest text-cyan hover:bg-cyan hover:text-black transition-all shadow-neon"
          >
            <Navigation size={16} />
            <span>Fast Travel To Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}
