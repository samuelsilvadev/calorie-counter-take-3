"use strict";

function setProps(target, props) {
  target.id = props._id;
  target.createdBy = props.createdBy;
  target.updatedBy = props.updatedBy;
  target.saturatedFats = props.saturatedFats;
  target.calories = props.calories;
  target.alcohol = props.alcohol;
  target.addedSugars = props.addedSugars;
  target.solidFats = props.solidFats;
  target.oils = props.oils;
  target.dryBeansPeas = props.dryBeansPeas;
  target.soy = props.soy;
  target.meats = props.meats;
  target.milk = props.milk;
  target.fruits = props.fruits;
  target.otherVegetables = props.otherVegetables;
  target.starchyVegetables = props.starchyVegetables;
  target.darkGreenVegetables = props.darkGreenVegetables;
  target.orangeVegetables = props.orangeVegetables;
  target.vegetables = props.vegetables;
  target.wholeGrains = props.wholeGrains;
  target.grains = props.grains;
  target.multiplier = props.multiplier;
  target.increment = props.increment;
  target.factor = props.factor;
  target.portionDisplayName = props.portionDisplayName;
  target.portionAmount = props.portionAmount;
  target.portion = props.portion;
  target.name = props.name;
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

    // Delete Fields which are not present in data
    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) {
        delete this[key];
      }
    });
    Object.freeze(this);
  }
}

module.exports = { GetDTO, InsertDTO, UpdateDTO };
