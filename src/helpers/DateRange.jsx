export const DateRange = (selectedRange) => {
  const today = new Date();

  const createDateWithOffset = (offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    return date;
  };

  switch (selectedRange) {
    case 'today':
      return { startDate: today, endDate: today };
    case 'last7days':
      return { startDate: createDateWithOffset(6), endDate: today };
    case 'last14days':
      return { startDate: createDateWithOffset(13), endDate: today };
    case 'last30days':
      return { startDate: createDateWithOffset(29), endDate: today };
    case 'last3months':
      return { startDate: createDateWithOffset(90), endDate: today };
    case 'last6months':
      return { startDate: createDateWithOffset(180), endDate: today };
    case 'lastyear':
      return { startDate: createDateWithOffset(365), endDate: today };
    default:
      return { startDate: null, endDate: null };
  }
};