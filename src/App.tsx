import { Route, Routes } from "react-router-dom"
import CustomLayout from "./Layout"
import ProductList from "./ProductList"
import ProductAdd from "./ProductAdd"
import ProductEdit from "./ProductEdit"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import UserList from "./UserList"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
