export const lightTheme = {
  body: 'var(--white)',
  text: 'var(--grayscale-800)',
  primaryColor: 'var(--primary)',
  secondaryColor: 'var(--secondary)',
  toggleBack: 'var(--white)',
  gnbBack: 'var(--white)',
  gnbIconDefault: 'var(--grayscale-400)',
  gnbIconAcive: 'var(--grayscale-900)',
  headerBack: 'var(--white)',
};

export const darkTheme = {
  body: 'var(--grayscale-900)',
  text: 'var(--white)',
  primaryColor: 'var(--primary)',
  secondaryColor: 'var(--secondary)',
  toggleBack: 'var(--grayscale-800)',
  gnbBack: 'var(--grayscale-800)',
  gnbIconDefault: 'var(--grayscale-600)',
  gnbIconAcive: 'var(--grayscale-100)',
  headerBack: 'var(--grayscale-900)',
};

export type Theme = typeof lightTheme;