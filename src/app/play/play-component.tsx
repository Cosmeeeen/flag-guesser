'use client';

import * as React from 'react';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";

import { LoaderCircle } from 'lucide-react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CONTINENTS } from '@/lib/constants';

import { checkAnswer, saveHighscore, getHighscore } from './utils';

export function PlayComponent() {
  const searchParams = useSearchParams();
  const rawContinent = searchParams.get('continent');
  const continent = React.useMemo(() => (
    CONTINENTS.includes(rawContinent ?? '') ? rawContinent : 'europe'
  ), [rawContinent]);

  const [currentFlagUrl, setCurrentFlagUrl] = React.useState<string | null>(null);
  const [countryFact, setCountryFact] = React.useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = React.useState<string | null>(null);

  const [currentGuess, setCurrentGuess] = React.useState<string>('');
  const [score, setScore] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(0);
  const [showFact, setShowFact] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const changeFlag = React.useCallback(async () => {
    setCurrentFlagUrl(null);
    setCountryFact(null);
    const randomFlagData = await fetch(`/api/flags/random?continent=${encodeURIComponent(continent ?? '')}`).then((res) => res.json());
    setCurrentFlagUrl(randomFlagData.flag);
    setCorrectAnswer(randomFlagData.name);
    const randomCountryFact = await fetch(`/api/fact?country=${randomFlagData.name}`).then((res) => res.json());
    setCountryFact(randomCountryFact.info);
  }, [continent]);

  React.useEffect(() => {
    changeFlag();
    const savedHighScore = getHighscore(continent ?? undefined);
    console.log('Highscore on load:', savedHighScore);
    if (savedHighScore) {
      setHighScore(savedHighScore);
    }
  }, [changeFlag, continent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentGuess) {
      handleSubmitGuess();
    }
  }

  const handleSubmitGuess = React.useCallback(() => {
    setCurrentGuess('');
    if (checkAnswer(currentGuess, correctAnswer ?? '')) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
        saveHighscore(score + 1, continent ?? undefined);
      }
    } else {
      setScore(0);
      setCountryFact(`Incorrect! The correct answer was ${correctAnswer}.`);
    }
    setShowFact(true);
  }, [score, highScore, correctAnswer, currentGuess, continent]);

  const handleNextFlag = () => {
    setShowFact(false);
    changeFlag();
    setCurrentGuess('');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-32 gap-4 px-4">
      <h1 className="text-2xl font-medium">Score: {score}</h1>
      <h2 className="text-lg">High Score ({continent && continent.charAt(0).toUpperCase() + continent.slice(1)}): {highScore}</h2>
      {currentFlagUrl ? (
        <Image
          src={currentFlagUrl}
          alt="Random Flag"
          width={300}
          height={200}
          className="rounded-lg border border-accent"
        />
      ) : (
        <LoaderCircle className="animate-spin text-default size-12" />
      )}
      {countryFact && showFact && (
        <p className="text-center text-lg">{countryFact}</p>
      )}
      {showFact ? (
        <Button
          onClick={handleNextFlag}
          className="w-full"
        >
          Next Flag
        </Button>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Type your guess here..."
            className="w-full"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={currentGuess}
            ref={inputRef}
          />
          <Button
            variant="secondary"
            size="icon"
            disabled={!currentGuess}
            onClick={handleSubmitGuess}
          >
            <Check className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

