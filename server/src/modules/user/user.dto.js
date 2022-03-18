"use strict";

function setProps(target, props) {
  target.id = props._id;
  target.createdBy = props.createdBy;
  target.updatedBy = props.updatedBy;
  target.createdAt = props.createdAt;
  target.updatedAt = props.updatedAt;
  target.name = props.name;
  target.email = props.email;
}

class GetDTO {
  constructor({ ...props }) {
    setProps(this, props);

    Object.freeze(this);
  }
}

class InsertDTO {
  constructor({ ...props }) {
    setProps(this, props);

    Object.freeze(this);
  }
}

class UpdateDTO {
  constructor({ ...props }) {
    setProps(this, props);

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) {
        delete this[key];
      }
    });
    Object.freeze(this);
  }
}

module.exports = { GetDTO, InsertDTO, UpdateDTO };
