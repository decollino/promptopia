import { useState } from "react";
import PromptCard from "./PromptCard";

const Dashboard = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  console.log("data dashboard compon: ", data);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return data.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.name) ||
        regex.test(item.birthDate) ||
        regex.test(item.email)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    //    <section className="feed">
    <section className="w-full flex-center flex-col">
      <h1 className="head_text ">
        <span className="blue_gradient">{name} Dashboard</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/*<form className="relative w-full flex-center">*/}
      <form className="relative w-full flex-center desc">
        <input
          type="text"
          placeholder="Search for a patient or a hospital"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div className="mt-10 prompt_layout">
        {searchText
          ? searchedResults.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))
          : data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
      </div>
    </section>
  );
};

export default Dashboard;
