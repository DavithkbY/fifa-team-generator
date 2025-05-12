import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldAlert, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TeamCard from "./TeamCard";
import PlayerInput from "./PlayerInput";
import { TeamConfig, ClubRating } from "@shared/schema";
import { getTwoRandomClubs, DEFAULT_PLAYERS } from "@/lib/clubData";

interface TeamGeneratorProps {
  onGenerateTeams: (teams: { team1: string[], team2: string[], team1Club: string, team2Club: string }) => void;
  isGenerating: boolean;
  latestTeams: TeamConfig | null;
}

export default function TeamGenerator({ 
  onGenerateTeams, 
  isGenerating,
  latestTeams
}: TeamGeneratorProps) {
  const [players, setPlayers] = useState<string[]>(DEFAULT_PLAYERS);
  const [teams, setTeams] = useState<{ 
    team1: string[], 
    team2: string[],
    team1Club: string,
    team2Club: string
  }>({
    team1: [],
    team2: [],
    team1Club: "",
    team2Club: ""
  });
  
  const [minRating, setMinRating] = useState<ClubRating>("4.5");

  // Initialize with random teams or use the latest from history
  useEffect(() => {
    if (latestTeams) {
      setTeams({
        team1: latestTeams.team1,
        team2: latestTeams.team2,
        team1Club: latestTeams.team1Club,
        team2Club: latestTeams.team2Club
      });
    } else {
      generateRandomTeams();
    }
  }, [latestTeams]);

  // Regenerate teams when players change
  useEffect(() => {
    if (players.length === 4) {
      generateRandomTeams();
    }
  }, [players]);

  // Function to generate random teams with clubs
  const generateRandomTeams = () => {
    if (players.length !== 4) return;
    
    // Clone the array to avoid modifying the original
    const shuffled = [...players];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Split into two teams
    const team1 = shuffled.slice(0, 2);
    const team2 = shuffled.slice(2, 4);
    
    // Get random clubs based on rating
    const [club1, club2] = getTwoRandomClubs(minRating);
    
    const newTeams = { 
      team1, 
      team2,
      team1Club: club1.name,
      team2Club: club2.name
    };
    
    setTeams(newTeams);
    return newTeams;
  };

  // Handle generate button click
  const handleGenerateTeams = () => {
    const newTeams = generateRandomTeams();
    if (newTeams) {
      onGenerateTeams(newTeams);
    }
  };

  // Handle club rating change
  const handleRatingChange = (value: string) => {
    setMinRating(value as ClubRating);
  };

  // Handle player changes
  const handlePlayersChange = (updatedPlayers: string[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Player Configuration */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-neutral-600" />
          <h3 className="text-lg font-medium">Players</h3>
        </div>
        <PlayerInput onChange={handlePlayersChange} maxPlayers={4} />
        
        {players.length !== 4 && (
          <p className="text-amber-600 text-sm mt-2">
            You need exactly 4 players to generate teams.
          </p>
        )}
      </div>

      <Separator className="my-6" />

      {/* Club Rating Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="h-5 w-5 text-neutral-600" />
          <h3 className="text-lg font-medium">Football Club Rating</h3>
        </div>
        <Select value={minRating} onValueChange={handleRatingChange}>
          <SelectTrigger id="club-rating" className="w-full md:w-64">
            <SelectValue placeholder="Select minimum club rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4.5">4.5 Stars (includes 5 star clubs)</SelectItem>
            <SelectItem value="5">5 Stars only</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-neutral-500 mt-1">
          Select minimum club rating to use for team generation
        </p>
      </div>

      {/* Team Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamCard 
          teamNumber={1} 
          teamColor="blue" 
          members={teams.team1}
          clubName={teams.team1Club}
        />
        <TeamCard 
          teamNumber={2} 
          teamColor="green" 
          members={teams.team2}
          clubName={teams.team2Club}
        />
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={handleGenerateTeams} 
          disabled={isGenerating || players.length !== 4}
          className="font-medium py-3 px-8 shadow-md"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Generate Teams
        </Button>
      </div>
    </div>
  );
}
