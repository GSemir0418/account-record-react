import { useRouteError } from 'react-router-dom'
export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error(error)

  return <div>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occured.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
}
