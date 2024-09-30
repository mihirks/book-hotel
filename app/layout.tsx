import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'

import RentModal from './components/modals/RentModal'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'
import ResetPwdModal from './components/modals/ResetPwdModal'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Hotel Bookings',
  description: 'Travel to explore yourself',
  // icon : {LandScape}
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser= await getCurrentUser();
  return (
  <html lang="en" >
    <head>
    <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1RTqMi9t0pgw0SU1HFnz7g8kIHU6hVJpOqQ&s" />
  </head>
      <body className={nunito.className} >
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal/>
          <RentModal />
          <SearchModal />
          <ResetPwdModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className=''>
          {children}
        </div>
        </body>
    </html>
  )
}
