import { useState } from "react";
import { Food, FoodTag, foodTags } from "./foods";
import { Card } from "./reusable/Card";
import { Button } from "./reusable/Button";
import { Spinner } from "./reusable/Spinner";
import { Link } from "react-router-dom";
import { useGetFoodsQuery } from "./hooks/useGetFoodsQuery";
import { useDeleteFood } from "./hooks/useDeleteFood";
import { toast } from "react-hot-toast";
import { useUserContext } from "./context/UserContext";

export function Menu() {
  const user = useUserContext();
  const [tagFilter, setTagFilter] = useState<FoodTag | "">("");
  const [cart, setCart] = useState({});
  const getFoodsQuery = useGetFoodsQuery();
  const deleteFoodMutation = useDeleteFood();

  // Derived state
  const filteredFoods = tagFilter
    ? getFoodsQuery.data.filter((food) => food.tags.includes(tagFilter))
    : getFoodsQuery.data;

  function renderFood(food: Food) {
    return (
      <Card key={food.id}>
        {user.isAdmin ? <Link to={"/manage/" + food.id}>
          <h2 className="text-2xl font-bold">{food.name}</h2>
        </Link> : <h2 className="text-2xl font-bold">{food.name}</h2>}
        <p>{food.description}</p>
        <strong>${food.price}</strong>
        {user.isAdmin ? <Button
          className="block"
          onClick={() => {
            deleteFoodMutation.mutate(food.id);
            toast.success("Food deleted.");
            // setFoods(foods.filter((f) => f.id !== food.id));
          }}
          type="button"
          aria-label={"Delete " + food.name}
        >
          Delete
        </Button> : <div>Number, plus, minus</div>}
      </Card>
    );
  }

  function renderMenu() {
    return (
      <>
        <label htmlFor="tag-filter-select">Filter by tag</label>
        <br />
        <select
          id="tag-filter-select"
          value={tagFilter}
          onChange={(event) => setTagFilter(event.target.value as FoodTag)}
        >
          <option value="">All items</option>
          {foodTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {tagFilter && (
          <p>{`${filteredFoods.length} ${tagFilter} item${filteredFoods.length == 1 ? '' : 's'} found.`}</p>
        )}

        <div className="flex flex-wrap">{filteredFoods.map(renderFood)}</div>
      </>
    );
  }

  return (
    <>
      {getFoodsQuery.isRefetching && <p>Checking for fresh data...</p>}
      {!user.isAdmin && <div class="fixed right-0 top-0">Cart</div>}
      <h1>Menu</h1>
      {
        <Spinner isLoading={getFoodsQuery.data.length === 0}>
          {renderMenu()}
        </Spinner>
      }
    </>
  );
}
