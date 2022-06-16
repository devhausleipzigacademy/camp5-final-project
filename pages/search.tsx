import { Category } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox/Checkbox";
import Input from "../components/Inputfields/Input";
import { getCategories } from "../utils/getCategories";

const Searchpage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [possibleSub, setPossibleSub] = useState<string[]>([]);

  async function getData() {
    const categoryFetch = await getCategories();
    setCategory(categoryFetch);
  }

  useEffect(() => {
    getData();
  }, []);

  function submitHandler() {}
  return (
    <div className="bg-BG">
      <Input name="Title" value="title" placeholder="Title"></Input>
      <div className="flex flex-row">
        <Checkbox
          isChecked={false}
          id="free"
          name={"Giveaway"}
          checkHandler={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Checkbox
          isChecked={false}
          id="swap"
          name="Swap"
          checkHandler={() => {}}
        />
      </div>
      <select name="Category" id="category" onChange={() => {}}>
        <option label="Category"></option>
        {category.map((cat) => (
          <option
            key={cat.identifier}
            value={cat.title}
            label={cat.title}
          ></option>
        ))}
      </select>
    </div>
  );
};

export default Searchpage;
