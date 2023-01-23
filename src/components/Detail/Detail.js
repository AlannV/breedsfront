import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../Redux/actions/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const breedDetails = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
    return dispatch(clearDetail());
  }, [dispatch, id]);

  return (
    <div className="main-container">
      <div className="main-container-detail">
        {breedDetails && (
          <div className="card-container-detail">
            <div className="img-detail-container">
              <h2 className="data-breed-name">{breedDetails.name}</h2>

              <img
                className="img-styles"
                height="200px"
                width="270px"
                src={breedDetails.imageUrl}
                alt=""
              />
            </div>
            <div className="data-breed-detail">
              <h4 className="data-breed-data">
                Height: {breedDetails.height} cm
              </h4>
              <h4 className="data-breed-data">
                Weight: {breedDetails.weight} kg
              </h4>
              <h4 className="data-breed-data">
                Life Span: {breedDetails.life_span}
              </h4>
              <h4 className="data-breed-data">Temperaments:</h4>
              <ul className="breed-list">
                {breedDetails.temperaments &&
                  breedDetails.temperaments.map((el) => (
                    <li className="breed-list">{el.name}</li>
                  ))}
              </ul>
            </div>
            <Link to="/home">
              <button className="reset-btn">Back</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
