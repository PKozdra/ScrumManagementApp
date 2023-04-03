// this component is a white box in the center of the screen with smooth edges and a shadow
import React from "react";

function BlankForm(props) {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        {props.children}
      </div>
    </div>
  );
}

export default BlankForm;
