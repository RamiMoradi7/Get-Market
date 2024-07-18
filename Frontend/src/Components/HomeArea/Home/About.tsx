import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useTitle from "../../../Hooks/UseTitle";
import { AppState } from "../../../Redux/AppState";
import "./About.css";

const About: React.FC = () => {
  const user = useSelector((appState: AppState) => appState.user);
  useTitle("About Us");
  return (
    <section className="Home-Section">
      <div className="Home-Content">
        <p>Welcome to Get Market!</p>
        <p>
          At Get Market, we pride ourselves on being your one-stop destination
          for all your grocery needs. Whether you're looking for fresh dairy
          products, premium cuts of meat, farm-fresh eggs, or indulgent
          chocolates and snacks, we've got you covered.
        </p>
        <p>
          Our mission is simple: to provide our customers with the highest
          quality products at competitive prices, all conveniently available at
          your fingertips. With a wide range of products spanning from pantry
          staples to gourmet delights, we aim to cater to every taste and
          preference.
        </p>
        {!user && (
          <NavLink className="Link" to={"/register"}>
            Join Us !
          </NavLink>
        )}
        {user && (
          <NavLink className="Link" to={"/products"}>
            Shop
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default About;
