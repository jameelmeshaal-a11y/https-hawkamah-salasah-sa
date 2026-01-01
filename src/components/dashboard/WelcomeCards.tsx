import { useState, useEffect } from "react";

const WelcomeCards = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatFullDate = (date: Date) => {
    const weekday = date.toLocaleDateString("ar-SA", { weekday: "long" });
    const day = date.getDate();
    const hijriMonth = date.toLocaleDateString("ar-SA-u-ca-islamic", { month: "long" });
    const hijriYear = date.toLocaleDateString("ar-SA-u-ca-islamic", { year: "numeric" });
    const gregorianDay = date.getDate();
    const gregorianMonth = date.toLocaleDateString("ar-SA", { month: "long" });
    const gregorianYear = date.getFullYear();
    
    return `${weekday}، ${day} ${hijriMonth} ${hijriYear}هـ، ${gregorianDay} ${gregorianMonth} ${gregorianYear}م`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div dir="ltr" className="flex gap-4 mb-6">
      {/* LEFT Card - Date & Time (Light/Gray) */}
      <div className="flex-1 bg-card text-foreground py-6 px-8 text-center rounded-lg shadow-lg border border-border">
        <div className="text-sm text-muted-foreground mb-1">تاريخ اليوم</div>
        <div className="text-base font-medium mb-4">{formatFullDate(currentTime)}</div>
        <div className="text-sm text-muted-foreground mb-1">الوقت الآن</div>
        <div className="text-4xl font-bold tracking-wider">{formatTime(currentTime)}</div>
      </div>

      {/* RIGHT Card - Logo & Welcome (Dark Teal) */}
      <div className="bg-primary text-primary-foreground py-6 px-8 flex items-center gap-6 min-w-[350px] rounded-lg shadow-lg">
        {/* Welcome Text */}
        <div className="text-right flex-1">
          <div className="text-sm opacity-80 mb-1">مرحبا بك</div>
          <div className="text-xl font-bold">مدير النظام التقني</div>
        </div>
        
        {/* Logo */}
        <div className="text-center border-r border-primary-foreground/20 pr-6">
          <div className="text-4xl font-bold mb-1">سلاسة</div>
          <div className="text-sm opacity-80 tracking-widest">SALASAH</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCards;
