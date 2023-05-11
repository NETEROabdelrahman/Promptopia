'use client';

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import Nav from "./Nav";

const Provider = ({ children, session }) => {
  const [colorMode, setColorMode] = useState(false)
 
  return (
    <SessionProvider session={session} colorMode={colorMode}>
      <div className='main'>
        <div className={colorMode ? 'light-gradient' : 'dark-gradient'} />
      </div>
      <div className="app2">
        <Nav colorMode={colorMode} setColorMode={setColorMode} />
      </div>
      {children}
      
    </SessionProvider>
  )
};

export default Provider;