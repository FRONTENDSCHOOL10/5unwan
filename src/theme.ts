export const lightTheme = {
  body: 'var(--white)',
  text: 'var(--grayscale-800)',
  primaryColor: 'var(--primary)',
  secondaryColor: 'var(--secondary)',
  toggleBackground: 'var(--white)',
  gnbBar: 'var(--white)',
  gnbIconDefault: 'var(--grayscale-400)',
  gnbIconAcive: 'var(--grayscale-900)',
};

export const darkTheme = {
  body: 'var(--grayscale-900)',
  text: 'var(--white)',
  primaryColor: 'var(--primary)',
  secondaryColor: 'var(--secondary)',
  toggleBackground: 'var(--grayscale-800)',
  gnbBar: 'var(--grayscale-800)',
  gnbIconDefault: 'var(--grayscale-600)',
  gnbIconAcive: 'var(--grayscale-100)',
};

export type Theme = typeof lightTheme;