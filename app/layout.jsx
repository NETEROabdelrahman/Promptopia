'use client'

import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { useState } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  const [colorMode,setColorMode] = useState(false)
  
  
  return(
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className={colorMode?'light-gradient':'dark-gradient'} />
        </div>

        <main className='app'>
          <Nav colorMode={colorMode} setColorMode={setColorMode} />
          {children}
        </main>
      </Provider>
    </body>
  </html>
)};

export default RootLayout;