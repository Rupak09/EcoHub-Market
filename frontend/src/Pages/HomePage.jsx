import { ExampleNavbarFour } from "../Components/NavBarPostLogin"
import { ProductThree } from "../Components/ProductCards"
import Filters from "../Components/Filters"
function HomePage() {
    // const [filteredProducts, setFilteredProducts] = useState([]);
  
    // const handleFilterChange = (filters) => {
    //   // Implement logic to filter products based on selected filters
    //   // This may involve a backend request or just filtering the already available product data
    // };
  return (
    <div>
        <ExampleNavbarFour/>
    
        <ProductThree />
        {/* <Filters onFilterChange={handleFilterChange} />
        <ProductList products={filteredProducts} /> */}
    </div>
  )
}

export default HomePage
