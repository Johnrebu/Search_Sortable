import { useState } from "react";
// import the useState hook from react.
import "./App.css";
// import the App.css file.
import { Posts } from "./assets/Content.jsx";
// import the Posts array from the Content.jsx file.
// The App component should render a list of posts.
// The list should be filtered and sorted based on user input.
// The user should be able to search for a post by title.
// The user should be able to sort the list by title or description.
// The user should be able to sort the list in ascending or descending order.
// The list should be displayed in a card format.
// Each card should display the post title and description.
// If the list is empty, a message should be displayed.
// The App component should be exported as the default export.
// The App component should be defined in a file named App.jsx in the src directory.
// The App component should import the Posts array from the Content.jsx file in the assets directory.


export default function App() {
  const [list, setList] = useState(Posts);
  const [query, setQuery] = useState("");
  const [sortFeild, setSortFeild] = useState("title");
  const [sortBy, setSortBy] = useState("ascending");
  const [result, setResult] = useState();

  const handleChange = (e) => {
    const results = Posts.filter((post) => {
      if (e.target.value === "") return Posts;
      return post["title"].toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResult(results);
    setQuery(e.target.value);
    setList(sortFun(results, sortBy, sortFeild));
  };
  const sortFun = (result, sortby, sortfeild) => {
    if (sortby === "ascending") {
      result.sort((a, b) => (a[sortfeild] < b[sortfeild] ? -1 : 1));
    } else if (sortby === "descending") {
      result.sort((a, b) => (a[sortfeild] < b[sortfeild] ? 1 : -1));
    }
    return result;
  };
  const changeSortFeild = (field) => {
    setSortFeild(field);
    setQuery(query);
    setList(!result ? sortFun(Posts, sortBy, field) : sortFun(result, sortBy, field)
    );
  };
  const changeSortType = (type) => {
    setSortBy(type);
    setQuery(query);
    setList(!result ? sortFun(Posts, type, sortFeild) : sortFun(result, type, sortFeild)
    );
  };
  return (
    <div>
      <form>
        <div>
          {" "}
          <span className="span">Search: </span>
          <input type="search" placeholder="Search" onChange={handleChange} />
        </div>
        <div>
          <span className="span">Sort Feild: </span>
          <select
            name="feild"
            onChange={(e) => changeSortFeild(e.target.value)}
          >
            <option value="title">None</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
        </div>
        <div>
          <span className="span">Sort By:</span>
          <select
            name="sortby"
            onChange={(e) => changeSortType(e.target.value)}
          >
            <option value="ascending">None</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </form>
      <div>
        {list.map((post) => (
          <div className="card" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
        {list.length === 0 && <h2> Empty List !!!</h2>}
      </div>
    </div>
  );
}
