import { useState, useEffect } from 'react'
import './App.css'

import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from './spotifyProfile'

function App() {

  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [spotifyURI, setSpotifyURI] = useState('')
  const [link, setLink] = useState('')
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const asyncFunction = async () => {
        if (!code) {
          redirectToAuthCodeFlow(clientId);
        } else {
            const accessToken = await getAccessToken(clientId, code);
            const profile = await fetchProfile(accessToken);
            console.log(profile)
            setUserId(profile.id)
            setEmail(profile.email)
            setSpotifyURI(profile.uri)
            setLink(profile.external_urls.spotify)
            setProfileImage(profile.images[0])
        }
    }
    asyncFunction()

  }, [])

  return (
    <div>
      <p>{userId}</p>
      <p>{email}</p>
      <p>{spotifyURI}</p>
      <p>{link}</p>
      <p>{profileImage}</p>
      
    </div>
  )
}

export default App
