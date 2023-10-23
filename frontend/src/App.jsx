import {BrowserRouter as Router, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './Components/Header'
import CategoryPage from './pages/CategoryPage'
import DetailsPage from './pages/DetailsPage'
import { ContextProvider } from './Components/Context'
import PageNotFound from './pages/PageNotFound'
import CartPage from './pages/CartPage'

function App() {

  return (
    <>
        <ContextProvider>
			<Router>
          <Header />
          <Route path="/" exact component={Homepage} />
          <Route path="/:name" exact component={CategoryPage} />
          <Route path="/view/:id" exact component={DetailsPage} />
          <Route path = "/cart/cart" exact component={CartPage} />
          {/* <Route path="*" exact component={PageNotFound} /> */}
			</Router>
        </ContextProvider>
    </>
  )
}

export default App
