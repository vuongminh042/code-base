import { Route, Routes } from "react-router-dom"
import CustomLayout from "./Layout"
import ProductList from "./ProductList"
import ProductAdd from "./ProductAdd"
import ProductEdit from "./ProductEdit"
import Signup from "./SignUp"
import Signin from "./SignIn"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
