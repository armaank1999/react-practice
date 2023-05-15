import toast from "react-hot-toast";
import { Button } from "./reusable/Button";
import { Input } from "./reusable/Input";
import { useNavigate, useParams } from "react-router-dom";
import { getFood, postFood, putFood, deleteFood } from "./services/foods.service";
import { Food, NewFood } from "./foods";
import { useEffect, useState } from "react";
import { Spinner } from "./reusable/Spinner";
import { useUserContext } from "./context/UserContext";

const newFood: NewFood = {
  name: "",
  description: "",
  price: 0,
  image: "",
  tags: [],
};

export interface Errors {
  id?: string;
  name?: string;
  image?: string;
  price?: string;
  description?: string;
  tags?: string;
}

export type Status = "idle" | "submitted" | "saving";

export default function ManageMenu() {
  const user = useUserContext();
  if (! user?.isAdmin) {
    return (<h1 class="font-bold text-2xl">You do not have permission to view this page.</h1>);
  }
  const [status, setStatus] = useState<Status>("idle");
  const [food, setFood] = useState<Food | NewFood>(newFood);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function getErrors() {
    const errors: Errors = {};
    if (!food.name) errors.name = "Food name is required.";
    if (!food.description) errors.description = "Description is required.";
    if (!food.price) errors.price = "Price is required.";
    return errors;
  }
  const errors = getErrors();

  async function deleteCurrFood() {
    setIsDeleting(true);
    await deleteFood(id);
    toast.success("Food deleted.");
    navigate("/");
  }

  useEffect(() => {
    async function fetchFood() {
      try {
        if (!id) {
          setIsLoading(false);
          return;
        }
        // if (!Number.isInteger(id)) throw new Error("Invalid id");
        const food = await getFood(parseInt(id, 10));
        setFood(food);
        setIsLoading(false);
      } catch (error) {
        setError("Fetch failed.");
      }
    }
    fetchFood();
  }, []);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFood({ ...food, [event.target.id]: event.target.value });
  }

  function renderForm() {
    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // If there are errors, stop here.
          if (Object.keys(errors).length > 0) {
            setStatus("submitted");
            return;
          }
          setStatus("saving");
          setIsSaving(true);
          id ? await putFood(food as Food) : await postFood(food);
          toast.success("Menu Item Saved.");
          navigate("/");
        }}
      >
        <Input
          label="Name"
          id="name"
          value={food.name}
          onChange={onChange}
          error={errors.name}
          status={status}
        />
        <Input
          label="Description"
          id="description"
          value={food.description}
          onChange={onChange}
          error={errors.description}
          status={status}
          multiline
        />
        <Input
          label="Price"
          id="price"
          type="number"
          value={food.price ?? ""}
          onChange={onChange}
          error={errors.price}
          status={status}
        />
        <Button type="submit" style={{width: "195px"}}>Sav{isSaving ? "ing" : "e"} Menu Item</Button>
        {isSaving && <Spinner isLoading={isSaving} />}
      </form>
    );
  }

  if (error) throw new Error(error);

  return (
    <>
      <h1>{id ? "Edit" : "Add"} Menu Item</h1>
      <Spinner isLoading={isLoading}>{renderForm()}</Spinner>
      {id && !isLoading && <>
        <Button className="mt-4" bgColor="red" style={{width: "195px"}} onClick={deleteCurrFood}>Delet{isDeleting ? "ing" : "e"} Menu Item</Button>
        {isDeleting && <Spinner isLoading={isDeleting} />}
        </>
      }
    </>
  );
}
