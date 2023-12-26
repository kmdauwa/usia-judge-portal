import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

import { cookies } from 'next/headers'

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies})
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return

  return (
    <div>Dashboard, Welcome {user.email}!</div>
  )
}

export default DashboardPage