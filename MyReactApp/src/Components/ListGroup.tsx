import { useState } from "react";
interface ListProps {
  items: string[];
  heading: string;
  onSelected: (item: string) => void;
}

//import stylz from "../App.css";
//import { MouseEvent } from "react";

function ListGroup({ items, heading, onSelected }: ListProps) {
  //state
  const [selected, setselected] = useState(-1);

  //const handleClick = (event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>{heading}</h1>
      {items.length == 0 && <p>nothing found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selected === index ? "list-group-item active" : "list-group-item"
            }
            key={item}
            onClick={() => {
              setselected(index);
              onSelected(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
