import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'superskill-progress';

const defaultProgress = {
  completedNodes: [],
  currentXp: 0,
  earnedBadges: [],
  retoResults: {},
  startedAt: null,
  route: 'lineal'
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeNode = useCallback((nodeId, xp) => {
    setProgress(prev => {
      if (prev.completedNodes.includes(nodeId)) return prev;
      return {
        ...prev,
        completedNodes: [...prev.completedNodes, nodeId],
        currentXp: prev.currentXp + xp,
        startedAt: prev.startedAt || new Date().toISOString()
      };
    });
  }, []);

  const earnBadge = useCallback((badgeId) => {
    setProgress(prev => {
      if (prev.earnedBadges.includes(badgeId)) return prev;
      return { ...prev, earnedBadges: [...prev.earnedBadges, badgeId] };
    });
  }, []);

  const setRoute = useCallback((route) => {
    setProgress(prev => ({ ...prev, route }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getLevel = useCallback((xp) => {
    if (xp >= 851) return { id: 6, nombre: 'Gran Maestro de la Forja', emoji: '\uD83D\uDC51' };
    if (xp >= 651) return { id: 5, nombre: 'Arquitecto de Plugins', emoji: '\uD83C\uDFDB\uFE0F' };
    if (xp >= 451) return { id: 4, nombre: 'Maestro Fundidor', emoji: '\uD83D\uDEE1\uFE0F' };
    if (xp >= 251) return { id: 3, nombre: 'Forjador de Skills', emoji: '\u2694\uFE0F' };
    if (xp >= 101) return { id: 2, nombre: 'Herrero de Micro-Skills', emoji: '\uD83D\uDD28' };
    return { id: 1, nombre: 'Aprendiz de Herrero', emoji: '\uD83D\uDD25' };
  }, []);

  return {
    progress,
    completeNode,
    earnBadge,
    setRoute,
    resetProgress,
    getLevel,
    level: getLevel(progress.currentXp),
    completionPercent: Math.round((progress.completedNodes.length / 13) * 100)
  };
}
