import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Team {
  id: string;
  name: string;
  logo: string;
  players: string;
  country: string;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  time: string;
  round: string;
  day: string;
  platform: string;
}

export interface Prize {
  place: string;
  amount: string;
  description: string;
  icon: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: 'main' | 'partner' | 'info';
}

export interface AboutStat {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface TournamentData {
  name: string;
  subtitle: string;
  dates: string;
  format: string;
  prizePool: string;
  aboutSectionLabel: string;
  aboutTitle: string;
  description: string;
  aboutStats: AboutStat[];
  aboutFeatures: AboutFeature[];
  teams: Team[];
  matches: Match[];
  prizes: Prize[];
  sponsors: Sponsor[];
  rulesUrl: string;
  tgChannel: string;
  twitchUrl: string;
  tgContact: string;
  orgLogo: string;
  registrationBotToken: string;
  registrationChatId: string;
}

const defaultData: TournamentData = {
  name: 'COUNTER CUP',
  subtitle: 'Главный CS2 турнир года',
  dates: '15–20 Февраля 2025',
  format: 'Single Elimination',
  prizePool: '$50,000',
  aboutSectionLabel: 'О ТУРНИРЕ',
  aboutTitle: 'Что такое Counter Cup?',
  description: 'Counter Cup — это крупнейший открытый CS2 турнир СНГ. Лучшие команды региона сразятся за главный призовой фонд и звание чемпиона. Профессиональный уровень организации, прямые трансляции и незабываемые матчи!',
  aboutStats: [
    { id: 'teams', icon: '👥', label: 'Команды', value: '8' },
    { id: 'prize_pool', icon: '💰', label: 'Призовой фонд', value: '$50,000' },
    { id: 'format', icon: '🏆', label: 'Формат', value: 'Single Elimination' },
    { id: 'dates', icon: '📅', label: 'Даты', value: '15–20 Февраля 2025' },
  ],
  aboutFeatures: [
    {
      id: 'feature_1',
      icon: '🎯',
      title: 'Профессиональный уровень',
      desc: 'Организация турнира соответствует мировым стандартам киберспорта',
    },
    {
      id: 'feature_2',
      icon: '📡',
      title: 'Прямые трансляции',
      desc: 'Все матчи транслируются в прямом эфире на Twitch и VK',
    },
    {
      id: 'feature_3',
      icon: '🏅',
      title: 'Призовые выплаты',
      desc: 'Гарантированные выплаты победителям в течение 7 дней после финала',
    },
    {
      id: 'feature_4',
      icon: '🤝',
      title: 'Честная игра',
      desc: 'Строгий анти-чит контроль и система судейства',
    },
    {
      id: 'feature_5',
      icon: '📊',
      title: 'Статистика матчей',
      desc: 'Детальная статистика каждого матча и игрока',
    },
  ],
  rulesUrl: 'https://t.me/countercup',
  tgChannel: 'https://t.me/countercup',
  twitchUrl: 'https://twitch.tv/asltournament1',
  tgContact: '@faceit10lvll',
  orgLogo: 'https://sun9-78.userapi.com/s/v1/ig2/6jHYWoD5FhRcJQvW7-QGMc5Bs2czfuLj3qzAGpr037JAcKo_wg9odRvMYwWZ4tlmHr0rS9spfI32iV-zobpIUnhx.jpg?quality=95&as=32x30,48x45,72x67,108x101,160x150,240x225,360x338,480x450,540x506,640x600,720x675,1080x1013,1170x1097&from=bu&cs=1170x0',
  registrationBotToken: '8608357753:AAHUR3bDmjyezPs_C0j-xIncv_HNTz6NfUE',
  registrationChatId: '5844108785',
  teams: [
    { id: '1', name: 'Team Alpha', logo: '🔵', players: 'Player1, Player2, Player3, Player4, Player5', country: 'RU' },
    { id: '2', name: 'Team Bravo', logo: '🟡', players: 'Player6, Player7, Player8, Player9, Player10', country: 'UA' },
    { id: '3', name: 'Team Charlie', logo: '🔴', players: 'Player11, Player12, Player13, Player14, Player15', country: 'KZ' },
    { id: '4', name: 'Team Delta', logo: '🟢', players: 'Player16, Player17, Player18, Player19, Player20', country: 'BY' },
    { id: '5', name: 'Team Echo', logo: '🟣', players: 'Player21, Player22, Player23, Player24, Player25', country: 'RU' },
    { id: '6', name: 'Team Foxtrot', logo: '⚪', players: 'Player26, Player27, Player28, Player29, Player30', country: 'RU' },
    { id: '7', name: 'Team Golf', logo: '🟤', players: 'Player31, Player32, Player33, Player34, Player35', country: 'UA' },
    { id: '8', name: 'Team Hotel', logo: '🔶', players: 'Player36, Player37, Player38, Player39, Player40', country: 'KZ' },
  ],
  matches: [
    { id: '1', team1: 'Team Alpha', team2: 'Team Bravo', score1: 16, score2: 11, time: '14:00', round: '1/4 финала', day: 'День 1', platform: 'Twitch' },
    { id: '2', team1: 'Team Charlie', team2: 'Team Delta', score1: 16, score2: 14, time: '17:00', round: '1/4 финала', day: 'День 1', platform: 'Twitch' },
    { id: '3', team1: 'Team Echo', team2: 'Team Foxtrot', score1: null, score2: null, time: '14:00', round: '1/4 финала', day: 'День 2', platform: 'Twitch' },
    { id: '4', team1: 'Team Golf', team2: 'Team Hotel', score1: null, score2: null, time: '17:00', round: '1/4 финала', day: 'День 2', platform: 'Twitch' },
    { id: '5', team1: 'Team Alpha', team2: 'Team Charlie', score1: null, score2: null, time: '16:00', round: 'Полуфинал', day: 'День 3', platform: 'Twitch' },
    { id: '6', team1: 'TBD', team2: 'TBD', score1: null, score2: null, time: '19:00', round: 'Полуфинал', day: 'День 3', platform: 'Twitch' },
    { id: '7', team1: 'TBD', team2: 'TBD', score1: null, score2: null, time: '18:00', round: 'Финал', day: 'День 4', platform: 'Twitch' },
  ],
  prizes: [
    { place: '1 место', amount: '$25,000', description: 'Чемпион турнира', icon: '🥇' },
    { place: '2 место', amount: '$12,000', description: 'Финалист', icon: '🥈' },
    { place: '3–4 место', amount: '$5,000', description: 'Полуфиналисты', icon: '🥉' },
    { place: 'MVP', amount: '$2,000', description: 'Лучший игрок турнира', icon: '⭐' },
    { place: 'Top Fragger', amount: '$1,000', description: 'Лучший снайпер', icon: '🎯' },
  ],
  sponsors: [
    {
      id: '1',
      name: 'FACEIT',
      logo: 'https://sun9-66.userapi.com/s/v1/ig2/0DHTWPtbprjzCzBg5rrjwbhyBKog0BUQI9Cl2QyL70mMgwKUnXtBpKqzESVciKL4HyYhFi16KSZlYVFKa_mzQWxz.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&from=bu&cs=640x0',
      url: 'https://faceit.com',
      tier: 'main',
    },
  ],
};

interface TournamentContextType {
  data: TournamentData;
  updateData: (newData: Partial<TournamentData>) => void;
  updateTeam: (team: Team) => void;
  addTeam: (team: Team) => void;
  removeTeam: (id: string) => void;
  updateMatch: (match: Match) => void;
  addMatch: (match: Match) => void;
  removeMatch: (id: string) => void;
  updatePrize: (index: number, prize: Prize) => void;
  addPrize: (prize: Prize) => void;
  removePrize: (index: number) => void;
  updateSponsor: (sponsor: Sponsor) => void;
  addSponsor: (sponsor: Sponsor) => void;
  removeSponsor: (id: string) => void;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

export function TournamentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TournamentData>(() => {
    try {
      const saved = localStorage.getItem('countercup_data');
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem('countercup_data', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<TournamentData>) =>
    setData(prev => ({ ...prev, ...newData }));

  const updateTeam = (team: Team) =>
    setData(prev => ({ ...prev, teams: prev.teams.map(t => t.id === team.id ? team : t) }));

  const addTeam = (team: Team) =>
    setData(prev => ({ ...prev, teams: [...prev.teams, team] }));

  const removeTeam = (id: string) =>
    setData(prev => ({ ...prev, teams: prev.teams.filter(t => t.id !== id) }));

  const updateMatch = (match: Match) =>
    setData(prev => ({ ...prev, matches: prev.matches.map(m => m.id === match.id ? match : m) }));

  const addMatch = (match: Match) =>
    setData(prev => ({ ...prev, matches: [...prev.matches, match] }));

  const removeMatch = (id: string) =>
    setData(prev => ({ ...prev, matches: prev.matches.filter(m => m.id !== id) }));

  const updatePrize = (index: number, prize: Prize) =>
    setData(prev => { const p = [...prev.prizes]; p[index] = prize; return { ...prev, prizes: p }; });

  const addPrize = (prize: Prize) =>
    setData(prev => ({ ...prev, prizes: [...prev.prizes, prize] }));

  const removePrize = (index: number) =>
    setData(prev => ({ ...prev, prizes: prev.prizes.filter((_, i) => i !== index) }));

  const updateSponsor = (sponsor: Sponsor) =>
    setData(prev => ({ ...prev, sponsors: prev.sponsors.map(s => s.id === sponsor.id ? sponsor : s) }));

  const addSponsor = (sponsor: Sponsor) =>
    setData(prev => ({ ...prev, sponsors: [...prev.sponsors, sponsor] }));

  const removeSponsor = (id: string) =>
    setData(prev => ({ ...prev, sponsors: prev.sponsors.filter(s => s.id !== id) }));

  return (
    <TournamentContext.Provider value={{
      data, updateData,
      updateTeam, addTeam, removeTeam,
      updateMatch, addMatch, removeMatch,
      updatePrize, addPrize, removePrize,
      updateSponsor, addSponsor, removeSponsor,
    }}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error('useTournament must be used within TournamentProvider');
  return ctx;
}
