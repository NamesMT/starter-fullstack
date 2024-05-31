export default defineI18nConfig(() => ({
  legacy: false,
  fallbackWarn: false,
  fallbackLocale: 'en',
  locale: 'en',
  messages: {
    en: {
      'layouts.title': `starter-fullstack {'|'} {title}`,
      'pages.title.home': `Home`,
      'language': 'Language',
      'welcome': `Welcome`,
    },
    vi: {
      'pages.title.home': `Trang chủ`,
      'language': 'Ngôn ngữ',
      'welcome': `Xin chào`,
    },
  },
  flatJson: true,
}))
