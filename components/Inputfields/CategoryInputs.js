import React from "react";
import { useState } from "react";

function CategoryInputs(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // ???
  };
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label>Category</label>
      <br />
      <input
        name="category"
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <br />
      <label>Subcategory</label>
      <br />
      <input
        name="Appliance"
        type="text"
        onChange={(e) => setSubcategory(e.target.value)}
        value={subcategory}
      />
      <br />

      <input className="submitButton" type="submit" value="Log Category" />
    </form>
  );
}

export default CategoryInputs;

// Another Version 1

// import React, { Component, useState, useRef, Ref, useEffect } from "react";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";
// import { useForm } from "react-hook-form";

// const CategoryInputs = () => {

//     const category = [
//       {id: "1", name: "Appliances"},
//       {id: "2", name: "Pots/pans/forms"},
//       {id: "3", name: "Cutlery"},
//       {id: "4", name: "Dishes"},
//     ];

//   [category, setCategory] = useState([]);

//   useEffect(() => {
//     setCategory([])
//   },[] )

// return(
//   <div className="category-inputs">
//     <select className="form-control">
//       <option value="0">Select Category</option>
//     {
//     category &&
//     category !== undefined  ?
//     category.map((category, index) => {
//       return (
//         <option key={index} value={category.id}>{category.name}</option>
//       )
//       })
//     : "No Categories"
//       }
// </select>
//     </div>
// )

// }

// export default CategoryInputs

// Another version

// const Kitchen = [
//   { value: "Appliances ", label: "Appliances " },
//   { value: "Pots/pans/forms", label: "Pots/pans/forms" },
//   { value: "Cutlery ", label: "Cutlery " },
//   { value: "Dishes  ", label: "Dishes  " },
// ];

// const onSubmit = (data: String) => {
//   alert(JSON.stringify(data));
// };

// return (
//   <div>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="category">Category: </label>
//         <input name="category" id="category" ref={register} />
//       </div>
//       <div>
//       <label htmlFor="Appliances">Likes Cakes: </label>
//       <input
//         type="checkbox"
//         name="appliances"
//         id="appliances"
//         ref={register}
//       />
//       </div>
//       <div>
//       {Appliances && (
//       <div>
//         <label htmlFor="favouriteFlavour">Favourite Flavour:</label>
//         <select id="favouriteFlavour" name="favouriteFlavour" ref={register}>
//           <option value="chocolate">Chocolate</option>
//           <option value="lime">Lime</option>
//           <option value="coconut">Coconut</option>
//           <option value="mango">Mango</option>
//         </select>
//       </div>
//        </div>

//           <button>Submit</button>
//           </form>

//     )}

// export default CategoryInputs
