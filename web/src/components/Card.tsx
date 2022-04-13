import React from "react";

interface IProps {
  title: string;
  imagePath: string;
  children: React.ReactNode;
}

export const Card: React.FC<IProps> = ({ title, children, imagePath }) => {
  return (
    <div className="column is-4">
      <div className="card is-shady">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={imagePath}
              alt={title}
              className="modal-button"
              data-target="modal-image2"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h4>{title}</h4>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
