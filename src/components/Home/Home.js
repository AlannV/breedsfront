import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreeds,
  filterBreedsByTemperament,
  filterByGroup,
  getTemperaments,
  orderByBreed,
  orderByWeight,
  getGroups,
} from "../../Redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import "./Home.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import { v4 } from "uuid";

import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const allBreeds = useSelector((state) => state.breeds);
  const temperaments = useSelector((state) => state.temperaments);
  const groups = useSelector((state) => state.groups);

  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage, setBreedsPerPage] = useState(9);
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed);

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
    dispatch(getGroups());
  }, [dispatch]);

  function handleReset(e) {
    setCurrentPage(1);
    dispatch(getBreeds());
  }

  function handleFilterByTemperament(e) {
    setCurrentPage(1);
    dispatch(filterBreedsByTemperament(e.target.value));
  }

  function handleFilterByGroups(e) {
    setCurrentPage(1);
    dispatch(filterByGroup(e.target.value));
  }

  function handleOrderByBreed(e) {
    setCurrentPage(1);
    dispatch(orderByBreed(e.target.value));
  }

  function handleOrderByWeight(e) {
    setCurrentPage(1);
    dispatch(orderByWeight(e.target.value));
  }

  function handleBreedsPerPage(e) {
    setCurrentPage(1);
    setBreedsPerPage(e.target.value);
  }

  return (
    <div className="home-main-container">
      <Header />
      <div className="nav">
        <Link to="/create">
          <button className="create-breed-btn">Create your own breed</button>
        </Link>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>

      <div className="home-sub-container">
        <div className="upper-side"></div>

        <div>
          <Paginado
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            allBreeds={allBreeds.length}
            breedsPerPage={breedsPerPage}
          />
        </div>

        <div className="filter-dogs-container">
          <div className="left-side">
            <>
              <label className="labels">Breeds p/page: </label>
              <select
                className="form-input"
                onChange={(e) => handleBreedsPerPage(e)}
              >
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
                <option value="36">36</option>
              </select>
            </>
            <>
              <label className="labels">Groups:</label>
              <select
                className="form-input"
                onChange={(e) => handleFilterByGroups(e)}
              >
                <option value={0}>Pick One</option>
                <option value={"all"}>All</option>
                {groups?.map((t) => {
                  return (
                    <option key={v4()} value={t}>
                      {t}
                    </option>
                  );
                })}
              </select>

              <label className="labels">Temperament</label>
              <select
                className="form-input"
                onChange={(e) => handleFilterByTemperament(e)}
              >
                <option>Pick One</option>
                <option value={"all"}>All</option>
                {temperaments?.map((t) => {
                  return (
                    <option key={v4()} value={t}>
                      {t}
                    </option>
                  );
                })}
              </select>

              <label className="labels">Alphabetically:</label>
              <select
                className="form-input"
                onChange={(e) => {
                  handleOrderByBreed(e);
                }}
              >
                <option value={0}>Pick One</option>
                <option value="asc"> A - Z </option>
                <option value="des"> Z - A </option>
              </select>
              <label className="labels">Weight:</label>
              <select
                className="form-input"
                onChange={(e) => {
                  handleOrderByWeight(e);
                }}
              >
                <option value={0}>Pick One</option>
                <option value="minToMax">Min to Max</option>
                <option value="maxToMin">Max to Min</option>
              </select>
              <br />

              <button
                className="reset-btn"
                onClick={(e) => {
                  handleReset(e);
                }}
              >
                Reset
              </button>
            </>
          </div>
          <div className="right-side">
            <div className="content-cards">
              {currentBreeds && allBreeds ? (
                currentBreeds?.map((el) => (
                  <Card
                    key={v4()}
                    name={el.name}
                    height={el.height}
                    weight={el.weight}
                    life_span={el.life_span}
                    imageUrl={el.imageUrl}
                    id={el.id}
                  />
                ))
              ) : (
                <div>
                  <h1>LOADING</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="paging-container">
        <Footer />
      </div> */}
    </div>
  );
}
