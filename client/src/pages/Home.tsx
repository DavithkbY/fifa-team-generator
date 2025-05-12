import TeamGenerator from "@/components/TeamGenerator";
import TeamHistory from "@/components/TeamHistory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { TeamConfig } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  // Fetch team history
  const { data: teamHistory, isLoading } = useQuery<TeamConfig[]>({
    queryKey: ["/api/teams"],
  });

  // Mutation for creating a new team configuration
  const { mutate: createTeamConfig, isPending } = useMutation({
    mutationFn: async (teams: { team1: string[], team2: string[], team1Club: string, team2Club: string }) => {
      const res = await apiRequest("POST", "/api/teams", teams);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
      toast({
        title: "Teams generated!",
        description: "New teams have been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate teams. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to create team configuration:", error);
    },
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Team Generator</h1>
        <p className="text-neutral-600">Create balanced teams with Davit, Jarne, Michiel, and Koen</p>
      </header>

      <main>
        <TeamGenerator 
          onGenerateTeams={createTeamConfig} 
          isGenerating={isPending} 
          latestTeams={teamHistory && teamHistory.length > 0 ? teamHistory[0] : null}
        />
        
        <TeamHistory 
          history={teamHistory || []} 
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
