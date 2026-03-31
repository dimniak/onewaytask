// src/utils/points.ts

/**
 * function to calculate points according to the following rule
 * 
 *  first day of season: 2 points
 *  second day of season: 3 points
 *  next days: 100% of the previous day + 60% of the day before that
 */
export const calculateDailyPoints = (date: Date): string => {
    const dayOfSeason = getDayOfSeason(date);
    
    if (dayOfSeason === 1) return "2";
    if (dayOfSeason === 2) return "3";
  
    let prevPrev = 2; // 1 day of season
    let prev = 3;     // 2 day of season
    let current = 0;
  
    for (let i = 3; i <= dayOfSeason; i++) {
      current = prevPrev + (prev * 0.6);
      prevPrev = prev;
      prev = current;
    }
  
    const roundedPoints = Math.round(current);
  
    // format to "K" if more than 1000

    if (roundedPoints >= 1000) {
      return `${Math.floor(roundedPoints / 1000)}K`;
    }
  
    return roundedPoints.toString();
  };
  
  /**
   * determine the number of the day in the current season
   * Spring: March-May, Summer: June-August, Autumn: September-November, Winter: December-February
   */
  function getDayOfSeason(date: Date): number {
    const month = date.getMonth(); // 0-11
    const day = date.getDate();
    const year = date.getFullYear();
  
    let seasonStartMonth = 0;
  
    if (month >= 2 && month <= 4) seasonStartMonth = 2;      // Spring (March 1)
    else if (month >= 5 && month <= 7) seasonStartMonth = 5; // Summer (June 1)
    else if (month >= 8 && month <= 10) seasonStartMonth = 8; // Autumn (Sept 1)
    else seasonStartMonth = 11;                             // Winter (Dec 1)
  

    // if it is winter and now January/February, the season started in December of the previous year
    // otherwise, the season started in the current year
    
    const startYear = (seasonStartMonth === 11 && month < 11) ? year - 1 : year;
    const startDate = new Date(startYear, seasonStartMonth, 1);
    
    const diffInMs = date.getTime() - startDate.getTime();
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  }