import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect } from 'react'

import { cookies } from 'next/headers'

const HomePage = async () => {
  const supabase = createServerComponentClient({ cookies})
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return

  return (
    <div>Home Page, Welcome {user.email}!</div>
  )
}

export default HomePage