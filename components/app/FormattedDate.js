import { useState, useEffect, useMemo } from 'react'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

// Set the default language to BLOG.lang
dayjs.extend(localizedFormat)
import(`dayjs/locale/en`)

export default function FormattedDate ({ date }) {
  const [ hasMounted, setHasMounted ] = useState(false)
 

  // When switching languages, the date format will also change correspondingly.
  const formattedDate = useMemo(() => {
    try {
      import(`dayjs/locale/en`)
      dayjs.locale(locale)
    } catch (err) {
    }
    return dayjs(date).format('ll')
  }, [date])

  // Solving the problem of inconsistent rendering between server-side and client-side.
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }
  return <span>{formattedDate}</span>
}
