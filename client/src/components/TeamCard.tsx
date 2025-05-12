interface TeamCardProps {
  teamNumber: number;
  teamColor: "blue" | "green";
  members: string[];
  clubName?: string;
}

export default function TeamCard({ teamNumber, teamColor, members, clubName }: TeamCardProps) {
  const bgColor = teamColor === "blue" ? "bg-blue-50" : "bg-green-50";
  const borderColor = teamColor === "blue" ? "border-blue-200" : "border-green-200";
  const textColor = teamColor === "blue" ? "text-blue-700" : "text-green-700";
  const itemBorderColor = teamColor === "blue" ? "border-blue-100" : "border-green-100";

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className={`text-xl font-semibold ${textColor}`}>
          Team {teamNumber}
        </h2>
        {clubName && (
          <span className={`text-sm font-medium px-3 py-1 rounded-full bg-white border ${borderColor}`}>
            {clubName}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {members.map((member, index) => (
          <li 
            key={index} 
            className={`bg-white rounded-md p-3 shadow-sm border ${itemBorderColor}`}
          >
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
}
