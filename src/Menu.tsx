import { useState } from "react";
import { Food, FoodTag, foodTags, foods } from "./foods";
import { Card } from "./reusable/Card";

export function Menu() {
  const [tagFilter, setTagFilter] = useState<FoodTag | null>(null);

  // Derived state
  const filteredFoods = tagFilter
    ? foods.filter((food) => food.tags.includes(tagFilter))
    : foods;

  function renderFood(food: Food) {
    return (
      <Card>
        <h2 className="text-2xl font-bold">{food.name}</h2>
        <p>{food.description}</p>
        <strong>${food.price}</strong>
      </Card>
    );
  }

  return (
    <>
      <h1>Menu</h1>
      <label htmlFor="tag-filter-select">Filter by tag</label>
      <br />
      <select
        id="tag-filter-select"
        value={tagFilter ?? ""}
        onChange={(event) => setTagFilter(event.target.value as FoodTag)}
      >
        <option value="">All items</option>
        {foodTags.map((tag) => (
          <option value={tag}>{tag}</option>
        ))}
      </select>
      <div className="flex flex-wrap">{filteredFoods.map(renderFood)}</div>
    </>
  );
}
