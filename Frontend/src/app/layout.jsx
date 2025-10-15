import '@/styles/globals.css'

export const metadata = {
  title: 'Illusio Design - IT Company | Web & Mobile Development',
  description: 'Innovate. Create. Transform. Leading IT company specializing in web development, mobile apps, UI/UX design, and digital solutions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
