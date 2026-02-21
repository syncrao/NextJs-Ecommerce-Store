import Link from "next/link"


const Admin = () => {
  console.log("Admin page rendered");
  return (
    <div className="p-6">
      <h1>Admin</h1>
      <Link href="/admin/products">
        <button className="btn btn-primary">Manage Products</button>
      </Link>
      <Link href="/admin/inventory">
        <button className="btn btn-secondary ml-4">Manage Inventory</button>
      </Link>
    </div> 

  )
}

export default Admin