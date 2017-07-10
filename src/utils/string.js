export const String = {
  toTitle: function(string) {
    return string.split(/-|[A-Z]+/).map(s => `${s.charAt(0).toUpperCase()}${s.substring(1, s.length)}`).join(' ');
  },
};

export const createPageTitle = string => {
  return string.split(/-|[A-Z]+/).map(s => `${s.charAt(0).toUpperCase()}${s.substring(1, s.length)}`).join(' ');
}
