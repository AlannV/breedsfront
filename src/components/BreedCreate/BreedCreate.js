import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import {
  postBreed,
  getTemperaments,
  getCountries,
  getGroups,
  startUploadingFiles,
  getBreeds,
} from "../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import validateForm from "./helpers/validateForm";
import "./BreedCreate.css";
import { Link } from "react-router-dom";

export default function BreedCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const countries = useSelector((state) => state.countries);
  const groups = useSelector((state) => state.groups);
  const img = useSelector((state) => state.imgLink);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    heightMin: "",
    heightMax: "",
    weight: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    imageUrl: "",
    temperament: [],
    breed_group: [],
    origin: [],
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e, name) {
    console.log(input[name].length);
    if (input[name].length > 5) {
      return setErrors({
        ...errors,
        [name]: `You can add 6 ${name} maximum`,
      });
    } else {
      setInput({
        ...input,
        [name]: [...input[name], e.target.value],
      });
    }
  }

  function handleDelete(el, name) {
    setInput({
      ...input,
      [name]: input[name].filter((c) => c !== el),
    });
  }

  function onFileInputChange(e) {
    if (e.target.files === 0) return;
    dispatch(startUploadingFiles(e.target.files));
  }

  function handleReset() {
    setInput({
      name: "",
      height: "",
      heightMin: "",
      heightMax: "",
      weight: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      lifeSpanMin: "",
      lifeSpanMax: "",
      imageUrl: "",
      temperament: [],
      breed_group: [],
      origin: [],
    });
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();

    input.name = input.name.replace(/ {2,}/g, " ");
    input.height = `${input.heightMin} - ${input.heightMax}`;
    input.weight = `${input.weightMin} - ${input.weightMax}`;
    input.life_span = `${input.lifeSpanMin} - ${input.lifeSpanMax}`;
    input.imageUrl = img;

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    dispatch(postBreed(input));
    dispatch(getBreeds());
    handleReset();
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getGroups());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="breed-main-container">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <p className="create-title">Create a new breed</p>
        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Name:
          </label>
          <div>
            <input
              type="text"
              value={input.name}
              name="name"
              required
              placeholder="Name..."
              title="The name has to be one or more words without numbers in it"
              onChange={(e) => handleChange(e)}
              className="form-input"
            />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Min and max height:
          </label>
          <input
            type="number"
            min={5}
            max={90}
            value={input.heightMin}
            name="heightMin"
            pattern="[0-9]{1,2}"
            required
            title="The min height has to be a number between 5cm and 90cm and can't be higher than the max height"
            placeholder="Min..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"cm"}
          <input
            type="number"
            min={6}
            max={99}
            value={input.heightMax}
            name="heightMax"
            pattern="[0-9]{1,2}"
            required
            title="The max height has to be a number between 6cm and 99cm and can't be lower than the min height"
            placeholder="Max..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"cm"}
          {errors.height && <p className="error-msg">{errors.height}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Min and max weight:
          </label>
          <input
            type="number"
            min={1}
            max={90}
            value={input.weightMin}
            name="weightMin"
            pattern="[0-9]{1,2}"
            required
            title="The min weight has to be a number between 1kg and 90kg and can't be higher than the max weight"
            placeholder="Min..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"kg"}
          <input
            type="number"
            min={2}
            max={99}
            value={input.weightMax}
            name="weightMax"
            pattern="[0-9]{1,2}"
            required
            title="The max weight has to be a number between 2kg and 99kg and can't be lower than the min weight"
            placeholder="Max..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"kg"}
          {errors.weight && <p className="error-msg">{errors.weight}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Expected life span:
          </label>
          <input
            type="number"
            min={1}
            max={25}
            value={input.lifeSpanMin}
            name="lifeSpanMin"
            pattern="[0-9]{1,2}"
            required
            title="The min life span has to be a number between 1 year and 25 years and can't be higher than the max life span"
            placeholder="Min..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"yrs"}
          <input
            type="number"
            min={2}
            max={30}
            value={input.lifeSpanMax}
            name="lifeSpanMax"
            pattern="[0-9]{1,2}"
            required
            title="The max life span has to be a number between 2 and 30 and can't be lower than the min life span"
            placeholder="Max..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          {"yrs"}
          {errors.life_span && <p className="error-msg">{errors.life_span}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Image:
          </label>
          <input
            type="file"
            name="image"
            placeholder="Imagen... https://..."
            value={input.image}
            onChange={onFileInputChange}
            className="form-input"
          />
          {errors.imageUrl && <p className="error-msg">{errors.imageUrl}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Choose one or more temperaments:
          </label>
          <select
            onChange={(e) => handleSelect(e, "temperament")}
            className="form-input"
            title="Select one or more temperaments, you can deselect any temperament previusly selected, simply by clicking the name in the box below"
          >
            <option key={0} value="">
              Select
            </option>
            {temperaments.map((t) => {
              return !input.temperament.includes(t) ? (
                <option key={t} value={t}>
                  {t}
                </option>
              ) : null;
            })}
          </select>
        </div>
        <div className="delete-container">
          <ul className="select-selected">
            {input.temperament.map((el) => (
              <div
                key={v4()}
                className="selected-options"
                onClick={() => handleDelete(el, "temperament")}
              >
                {el}
              </div>
            ))}
          </ul>
        </div>
        {errors.temperament && (
          <p className="error-msg">Error! {errors.temperament}</p>
        )}

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Choose one or more groups:
          </label>
          <select
            onChange={(e) => handleSelect(e, "breed_group")}
            className="form-input"
            title="Select one or more groups, you can deselect any group previusly selected, simply by clicking the name in the box below"
          >
            <option key={0} value="">
              Select
            </option>
            {groups.map((g) => {
              return !input.breed_group.includes(g) ? (
                <option key={g} value={g}>
                  {g}
                </option>
              ) : null;
            })}
          </select>
        </div>
        <div className="delete-container">
          <ul className="select-selected">
            {input.breed_group.map((el) => (
              <div
                key={v4()}
                className="selected-options"
                onClick={() => handleDelete(el, "breed_group")}
              >
                {el}
              </div>
            ))}
          </ul>
        </div>
        {errors.breed_group && (
          <p className="error-msg">Error! {errors.breed_group}</p>
        )}

        <div className="form-section">
          <label htmlFor="name" className="form-titles">
            Choose one or more countries:
          </label>
          <select
            onChange={(e) => handleSelect(e, "origin")}
            className="form-input"
            title="Select one or more countries, you can deselect any country previusly selected, simply by clicking the name in the box below"
          >
            <option key={0} value="">
              Select
            </option>
            {countries.map((c) => {
              return !input.origin.includes(c) ? (
                <option key={c} value={c}>
                  {c}
                </option>
              ) : null;
            })}
          </select>
        </div>
        <div className="delete-container">
          <ul className="select-selected">
            {input.origin.map((el) => (
              <div
                key={v4()}
                className="selected-options"
                onClick={() => handleDelete(el, "origin")}
              >
                {el}
              </div>
            ))}
          </ul>
        </div>
        {errors.origin && <p className="error-msg">Error! {errors.origin}</p>}

        <div className="button-container">
          <button type="submit" className="reset-btn">
            Create breed
          </button>
          <button type="reset" className="reset-btn" onClick={handleReset}>
            Reset Fields
          </button>
          <Link to="/home">
            <button className="reset-btn">Go Back</button>
          </Link>
        </div>
      </form>
      {img && (
        <div className="preview-image-container">
          <img src={img} className="create-img" alt="breed" />
        </div>
      )}
    </div>
  );
}
