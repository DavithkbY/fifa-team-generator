import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { DEFAULT_PLAYERS } from "@/lib/clubData";

interface PlayerInputProps {
  onChange: (players: string[]) => void;
  maxPlayers?: number;
}

export default function PlayerInput({ onChange, maxPlayers = 4 }: PlayerInputProps) {
  const [players, setPlayers] = useState<string[]>(DEFAULT_PLAYERS);
  const [newPlayer, setNewPlayer] = useState("");

  // Update parent component when players change
  useEffect(() => {
    onChange(players);
  }, [players, onChange]);

  const handleAddPlayer = () => {
    if (newPlayer.trim() && players.length < maxPlayers) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const handleRemovePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddPlayer();
    }
  };

  const resetToDefaults = () => {
    setPlayers(DEFAULT_PLAYERS);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {players.map((player, index) => (
          <div 
            key={index} 
            className="flex items-center gap-1 bg-white border border-neutral-200 rounded-full px-3 py-1"
          >
            <span className="text-sm">{player}</span>
            <button 
              onClick={() => handleRemovePlayer(index)}
              className="text-neutral-400 hover:text-red-500"
              aria-label={`Remove ${player}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {players.length < maxPlayers && (
        <div className="flex gap-2">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add player name"
            className="flex-1"
            maxLength={20}
          />
          <Button 
            onClick={handleAddPlayer} 
            size="sm"
            variant="outline"
            disabled={!newPlayer.trim() || players.length >= maxPlayers}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      )}

      {players.length !== DEFAULT_PLAYERS.length || 
       !players.every((player, i) => player === DEFAULT_PLAYERS[i]) ? (
        <Button 
          onClick={resetToDefaults}
          variant="ghost" 
          size="sm" 
          className="text-xs"
        >
          Reset to Defaults
        </Button>
      ) : null}
    </div>
  );
}