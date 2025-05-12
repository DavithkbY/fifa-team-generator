import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { TeamConfig } from "@shared/schema";

interface TeamHistoryProps {
  history: TeamConfig[];
  isLoading: boolean;
}

export default function TeamHistory({ history, isLoading }: TeamHistoryProps) {
  // Format date for display
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Clock className="h-5 w-5 mr-2 text-neutral-600" />
          Previous Teams
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-5 w-16 mb-1" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-16 mb-1" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          // Empty state
          <div className="text-center py-8 text-neutral-500">
            No previous team configurations yet. Generate teams to see history.
          </div>
        ) : (
          // History items
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-neutral-500">
                    Generated at {formatTime(entry.createdAt)}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-blue-700">Team 1</h3>
                      {entry.team1Club && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {entry.team1Club}
                        </span>
                      )}
                    </div>
                    <div className="bg-blue-50 rounded-md p-2">
                      <span className="block">{entry.team1.join(', ')}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-green-700">Team 2</h3>
                      {entry.team2Club && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          {entry.team2Club}
                        </span>
                      )}
                    </div>
                    <div className="bg-green-50 rounded-md p-2">
                      <span className="block">{entry.team2.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
