import './globals.css'

export const metadata = {
  title: 'Baundule Club',
  description: ' Let’s go anywhere!',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className=''>
          {children}
      </body>
    </html>
  )
}
export default RootLayout;