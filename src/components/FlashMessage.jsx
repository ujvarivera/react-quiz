import { Alert, AlertIcon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const FlashMessage = ({ status="error", message }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 4000)
    // Cleanup the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timer)
  }, [])

  return (
    show &&
    <Alert status={status}>
    <AlertIcon />
        {message}
    </Alert>
  )
}

export default FlashMessage