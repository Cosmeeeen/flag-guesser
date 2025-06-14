'use client';

import * as React from 'react';

const ALL_FLAGS = ['🇦🇴', '🇧🇫', '🇧🇮', '🇧🇯', '🇧🇼', '🇨🇩', '🇨🇫', '🇨🇬', '🇨🇮', '🇨🇲', '🇨🇻', '🇩🇯', '🇩🇿', '🇪🇬', '🇪🇭', '🇪🇷', '🇪🇹', '🇬🇦', '🇬🇭', '🇬🇲', '🇬🇳', '🇬🇶', '🇬🇼', '🇰🇪', '🇰🇲', '🇱🇷', '🇱🇸', '🇱🇾', '🇲🇦', '🇲🇬', '🇲🇱', '🇲🇷', '🇲🇺', '🇲🇼', '🇲🇿', '🇳🇦', '🇳🇪', '🇳🇬', '🇷🇼', '🇸🇨', '🇸🇩', '🇸🇱', '🇸🇳', '🇸🇴', '🇸🇸', '🇸🇿', '🇹🇩', '🇹🇬', '🇹🇳', '🇹🇿', '🇺🇬', '🇿🇦', '🇿🇲', '🇿🇼', '🇦🇬', '🇦🇮', '🇦🇷', '🇦🇼', '🇧🇧', '🇧🇱', '🇧🇲', '🇧🇴', '🇧🇶', '🇧🇷', '🇧🇸', '🇧🇿', '🇨🇦', '🇨🇱', '🇨🇴', '🇨🇷', '🇨🇺', '🇨🇼', '🇩🇲', '🇩🇴', '🇪🇨', '🇫🇰', '🇬🇩', '🇬🇫', '🇬🇵', '🇬🇹', '🇬🇾', '🇭🇳', '🇭🇹', '🇯🇲', '🇰🇳', '🇰🇾', '🇱🇨', '🇲🇫', '🇲🇶', '🇲🇸', '🇲🇽', '🇳🇮', '🇵🇦', '🇵🇪', '🇵🇲', '🇵🇷', '🇵🇾', '🇸🇷', '🇸🇻', '🇸🇽', '🇹🇨', '🇹🇹', '🇺🇸', '🇺🇾', '🇻🇪', '🇻🇬', '🇻🇮', '🇦🇪', '🇦🇫', '🇦🇿', '🇧🇩', '🇧🇭', '🇧🇳', '🇧🇹', '🇨🇳', '🇭🇰', '🇮🇩', '🇮🇱', '🇮🇳', '🇮🇶', '🇮🇷', '🇯🇴', '🇯🇵', '🇰🇬', '🇰🇭', '🇰🇵', '🇰🇷', '🇰🇼', '🇰🇿', '🇱🇦', '🇱🇧', '🇱🇰', '🇲🇲', '🇲🇳', '🇲🇴', '🇲🇻', '🇲🇾', '🇳🇵', '🇴🇲', '🇵🇭', '🇵🇰', '🇵🇸', '🇶🇦', '🇷🇺', '🇸🇦', '🇸🇬', '🇸🇾', '🇹🇭', '🇹🇯', '🇹🇱', '🇹🇲', '🇹🇷', '🇹🇼', '🇺🇿', '🇻🇳', '🇾🇪', '🇦🇩', '🇦🇱', '🇦🇲', '🇦🇹', '🇧🇦', '🇧🇪', '🇧🇬', '🇧🇾', '🇨🇭', '🇨🇶', '🇨🇾', '🇨🇿', '🇩🇪', '🇩🇰', '🇪🇦', '🇪🇪', '🇪🇸', '🇪🇺', '🇫🇮', '🇫🇷', '🇬🇧', '🇬🇪', '🇬🇬', '🇬🇮', '🇬🇷', '🇭🇷', '🇭🇺', '🇮🇪', '🇮🇲', '🇮🇸', '🇮🇹', '🇯🇪', '🇱🇮', '🇱🇹', '🇱🇺', '🇱🇻', '🇲🇨', '🇲🇩', '🇲🇪', '🇲🇰', '🇲🇹', '🇳🇱', '🇳🇴', '🇵🇱', '🇵🇹', '🇷🇴', '🇷🇸', '🇷🇺', '🇸🇪', '🇸🇮', '🇸🇰', '🇸🇲', '🇺🇦', '🇻🇦', '🇽🇰', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🏴󠁧󠁢󠁷󠁬󠁳󠁿', '🇦🇨', '🇦🇶', '🇦🇸', '🇦🇺', '🇦🇽', '🇧🇻', '🇨🇨', '🇨🇰', '🇨🇵', '🇨🇽', '🇩🇬', '🇫🇯', '🇫🇲', '🇬🇱', '🇬🇸', '🇬🇺', '🇭🇲', '🇮🇨', '🇮🇴', '🇰🇮', '🇲🇭', '🇲🇵', '🇳🇨', '🇳🇫', '🇳🇷', '🇳🇺', '🇳🇿', '🇵🇫', '🇵🇬', '🇵🇳', '🇵🇼', '🇷🇪', '🇸🇧', '🇸🇭', '🇸🇯', '🇸🇹', '🇹🇦', '🇹🇫', '🇹🇰', '🇹🇴', '🇹🇻', '🇺🇲', '🇻🇨', '🇻🇺', '🇼🇫', '🇼🇸', '🇾🇹'];

type ChangingFlagProps = React.HTMLAttributes<HTMLSpanElement>;
export const ChangingFlag = ({ className, ...rest }: ChangingFlagProps) => {
  const [flag, setFlag] = React.useState('🇷🇴');
  const [animate, setAnimate] = React.useState(true);

  const changeFlag = () => {
    const randomIndex = Math.floor(Math.random() * ALL_FLAGS.length);
    setFlag(ALL_FLAGS[randomIndex]);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        changeFlag();
        setAnimate(true);
      }, 500);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${animate ? 'animate-wiggle' : ''} ${className}`} role="presentation" aria-label="Changing Flag" {...rest}>
      {flag}
    </span>
  );
}
