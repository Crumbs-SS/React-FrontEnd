import '../../style/search-page.css';
import Header from '../Header';
import FilterOption from '../FilterOption';
import { useEffect, useState } from 'react';
import SearchResult from '../SearchResult';
import Pagination from '../Pagination';
import RestaurantService from '../../adapters/restaurantService';

const SearchPage = () => {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ query, setQuery ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(0);

  useEffect(() => {
    setQuery(getQuery());
    RestaurantService.getRestaurants(query, currentPage)
    .then(response => response.json())
    .then(results => {
      setSearchResults(results.content);
      setTotalPages(results.totalPages - 1);
    })
  }, [query, currentPage])

  const getQuery = () => {
    const queryStream = window.location.search.split('?'); //returns Query Stream
    const queryParams = queryStream[1].split('&'); // returns separated query params
    const search = queryParams[0].split('=')[1];
    return search.split('%20').join(' ')
  }

  return(
    <>
      <Header setQuery={setQuery}/>
      <div className="search-page">
        <div className="filter-options">
          <FilterOption text={"$$$"} />
          <FilterOption text={"Rating"} />
          <FilterOption text={"Location"} />
        </div>

        <h5 id="result-text"> { query ? `Showing search results for "${query}"` : 'Showing: All Restaurants'} </h5>
        <div className='mid-section'>
          <div className='content-context'>
            {
              (searchResults && searchResults.length > 0) ?
                searchResults.map(result => <SearchResult key={result.id} result={result}/>)
                  : <h3 id="result-status"> No Results Found </h3>
            }
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  )
}

export default SearchPage;