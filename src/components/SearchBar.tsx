import React from "react";

export default function SearchBar() {
  return (
    <form className="w-100">
      <div className="d-none d-md-flex search-bar rounded-pill bg-white gap-0">
        <div className="flex-grow-1 d-flex align-items-center ps-3 pe-3 border-end">
          <i className="fa-solid fa-location-dot"></i>
          <input
            type="text"
            placeholder="Bạn muốn đi đâu?"
            className="form-control border-0"
            style={{ outline: "none" }}
          />
        </div>

        <div className="flex-grow-1 d-flex align-items-center ps-3 pe-3 border-end">
          <i className="fa fa-calendar"></i>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            className="form-control border-0"
            style={{ outline: "none" }}
          />
        </div>

        {/* Check-out Date */}
        <div className="flex-grow-1 d-flex align-items-center ps-3 pe-3 border-end">
          <i className="fa fa-calendar"></i>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            className="form-control border-0"
            style={{ outline: "none" }}
          />
        </div>

        {/* Guests */}
        <div className="flex-grow-1 d-flex align-items-center ps-3 pe-3 border-end">
          <i className="fa fa-users"></i>
          <input
            type="number"
            placeholder="Số lượng"
            min="1"
            className="form-control border-0"
            style={{ outline: "none" }}
          />
        </div>

        {/* Search Button */}
        <button type="submit" className="btn btn-airbnb px-4 rounded-pill m-1">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
