export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/cart/', '/checkout/', '/account/', '/login-admin/'],
    },
    sitemap: 'https://www.vanameya.com/sitemap.xml',
  }
}
