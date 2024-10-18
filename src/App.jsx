import { useEffect, useState } from "react";

function App() {
  let [posts, setPosts] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  let [currentPage, setCurrentPage] = useState(1)
  let [postPerPage] = useState(5)

  let getTheData = async (query) => {
    let url = query
      ? `https://dummyjson.com/posts/search?q=${query}`
      : `https://dummyjson.com/posts?limit=100`;
    let response = await fetch(url);
    let data = await response.json();
    setPosts(data.posts);
    setCurrentPage(1);

  };

  useEffect(() => {
    getTheData();
  }, []);

  let handleChangeSearch = (e) => {
    let query = e.target.value;
    setSearchQuery(query)
    getTheData(query);
  };

  let lastIndexOfPost = currentPage * postPerPage
  let firstIndexOfPost = lastIndexOfPost - postPerPage
  let currentPost = posts.slice(firstIndexOfPost, lastIndexOfPost)

  let totalPages = Math.ceil(posts.length / postPerPage)

  let handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  let handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Post List</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleChangeSearch(e)}
          className="mb-4 mt-4"
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {currentPost &&
              currentPost.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>{item.views}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage < totalPages}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
