import caesarSalad from "../../images/cesar salad.jpg";
import chickenAlfredo from "../../images/chicken alfredo.jpg";
import margheritaPizza from "../../images/margherita.jpg";

const samples = [
  {
    id: 1,
    name: "caesar salad",
    description:
      "a tossed salad made of crisp romaine lettuce, crunchy croutons, grated or shaved Parmesan cheese, and a rich, savory dressing",
    cookTime: "5 to 20 minutes",
    image: caesarSalad,
  },
  {
    id: 2,
    name: "Chicken Alfredo",
    description:
      "Creamy pasta with tender chicken, Parmesan cheese, and a rich garlic sauce.",
    cookTime: "25 minutes",
    image: chickenAlfredo,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil.",
    cookTime: "30 minutes",
    image: margheritaPizza,
  },
];

export default samples;
