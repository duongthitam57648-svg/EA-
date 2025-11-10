interface UserInfoDisplayProps {
  avatar: string;
  name: string;
  grade: string;
}

export function UserInfoDisplay({ avatar, name, grade }: UserInfoDisplayProps) {
  return (
    <div className="absolute top-[8%] left-[6%] flex items-center gap-3 pointer-events-none">
      <img 
        src={avatar} 
        alt={name}
        className="w-14 h-14 rounded-full object-cover border-2 border-white"
      />
      <div>
        <div className="text-white">{name}</div>
        <div className="text-white/80 text-sm">{grade}</div>
      </div>
    </div>
  );
}
