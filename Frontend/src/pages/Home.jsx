import SearchBar from "../components/SearchBar.jsx"
import CourtGrid from "../components/CourtGrid.jsx"

function Home() {
    return (
        <div className="min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <SearchBar />
            <CourtGrid />
        </div>
    )
}
export default Home