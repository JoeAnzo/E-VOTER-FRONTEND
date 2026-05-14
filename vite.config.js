import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import {vitePWA} from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
    // vitePWA({
    //   registerType:'autoUpdate',
    //   includeAssets:['favicon.ico','apple-touch-icon.png','robots.txt'],
    //   manifest:{
    //     name:'Evoter',
    //     short_name:'Evoter',
    //     description:'A digital solution for school Elections',
    //     theme_color:'#5478FF',
    //     background_color:'#5478FF',
    //     display:'standalone',
    //     start_url:'/',
    //     icons:[
    //       {
    //         src:'android-chrome-192x192.png',
    //         sizes:'192x192',
    //         type:'image/png'
    //       },{
    //         src:'android-chrome-512x512.png',
    //         sizes:'512x512',
    //         purpose:'any maskable'
    //       }
    //     ]
    //   }
    // })
  ]
})
