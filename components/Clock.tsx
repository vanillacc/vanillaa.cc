import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [timeState, setTimeState] = useState({
    time: '',
    showSeparator: true
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      const day = now.getDate().toString().padStart(2, '0');
      const month = now.toLocaleString('en-US', { month: 'short' });

      return { hours, minutes, day, month };
    };

    const tick = () => {
      const { hours, minutes, day, month } = updateTime();
      setTimeState(prev => ({
        time: `${hours}:${minutes} . ${day} ${month}`,
        showSeparator: !prev.showSeparator 
      }));
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!timeState.time) return null;

  const [timePart, datePart] = timeState.time.split(' . ');
  const [hours, minutes] = timePart.split(':');

  return (
    <div className="fixed bottom-8 left-8 text-[#999] text-xs font-mono tracking-wider select-none tabular-nums transition-opacity duration-1000 animate-enter" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
      <span>{hours}</span>
      <span className={`${timeState.showSeparator ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>:</span>
      <span>{minutes}</span>
      <span className="mx-2 opacity-50">.</span>
      <span>{datePart}</span>
    </div>
  );
};

export default Clock;
