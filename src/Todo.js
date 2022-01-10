import React, { useEffect, useState } from "react";

const Todo = () => {
  const local = () => {
    const lists = localStorage.getItem("myTodoList");
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(local());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggle, setToggle] = useState(false);
  const addItems = (e) => {
    if (!inputData) {
      alert("Please fill any todo!");
    } else if (inputData && toggle) {
      setItems(
        items.map((curr) => {
          if (curr.id === isEditItem) {
            return { ...curr, name: inputData };
          }
          return curr;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggle(false);
    } else {
      e.preventDefault();
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      setItems([...items, newData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    const updated = items.filter((curr) => {
      return curr.id !== id;
    });
    setItems(updated);
  };
  const editItem = (index) => {
    const editedTodo = items.find((curr) => {
      return curr.id === index;
    });
    setInputData(editedTodo.name);
    setIsEditItem(index);
    setToggle(true);
  };
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAb1BMVEUAkAD////6+/rl7OWAsIA4ljjC1cIWkRZ9r32gwaCqxqrH2MelxKX1+PW4z7gikyI0ljReol4qlCrZ5NlHmkfv8+8NkQ1kpGSOt45rp2t2rHbT4NPL28tCmUKJtYno7uhWn1aWu5ZNnE1wqXBZoFkFAZ/hAAAESUlEQVR4nO2c67aqIBRGUbuX1c4up51ddue8/zMec1uaLiCTYDHGN/9aDmYFn8AiIQAAAAAAAAAAAAAAAACAj7GbTr9dt8EE1ygI4vnadTO6MwhuRD+u29GVXpyLBGG6d92UTqyS4M5msnTdmg5MggrJyXVz3ma3qYoE4fTLdYve5BDU2MxWrtv0Dj9hXSQIUg97yvrc9AiCsetmtWdAeXgoMiJ+WNnQZeWntTyNOzJ7PFdVIqRCPLLhsU/ID7ENZUMn5PW5FQ+yc7bj0dBahBRENp4eTXhE/fvdUupy+MeCx86AR/h4CKEiJAsRCx6LRgq/weB+tyv5qWxsPKH8jbt7nC/3u83J6zMLHqLXecCqZN2I/FQSK89ZBkQOi+JeSzpC7Ezdu4uUDZ2R161EiAkRDhFiQoRDhNRFotmkPY/FBXcR0hAZ6F8uZx1RHlYiJMeYiMMIyTEl4jJCcgyJLFxGSI4hEacRkmNG5MtphOSYEVFHyEL5XkMYEfmjjJCelZ5iQkQdIevESribEFFHyDzomWqsCgMi33SEFD0jm7lZWQrqLiJZyCo6RjaVDj0RUUfIOPBFRB0hl7M3IlPK4xEhtwVtP0ToCJkWV0+hLyJHZYQs86teiKgj5HdB2wcRSYQUs5B97IuIZBZyb3ixGuuBiCZCQl9E9BHiiYg+QvwQUUdIeWPuIupZSL8cB7iLqCOkMg4wF1FHSLX/8BbRLWR5IzImf1jlQpYvIv/oCDk+XuCLiDpCBDeR41byLvVC1g1WIpPzgW5DX78XwknktgUVz4/Em17YC2Ekcvntz1GzRlQSIcPqaxiJ3JsSDi7PbxmSVR+1vRA+IpX+fH4uDNdFSA4bkadHwjDdlVe0EcJLpNafN7NHD9BGCCuRZh3BoegDJ+UshJtIn3gk/K3WX764nc5EhK6wTHpiRRf1NrfTeYjIqtHilHx4p7bTWYjQQSGH2k5nIUIvV8mhttM5iNDLVXLI7XQOIt/tSrjoiiwOIkN6ZJLRiBA2ImI1b1FDK6nIYiGS/bpeH7ckFVlMRMRw9mKPf56F8BMRYpe+0udDWZ0JH5FsqvtC+b904YWTiLgMdF/KWVqRxUokmyaSz7ol8hNgzETEUTkSHyQ9XfATEWJEP/De2ChORvMTEauJbCSeKO7LUCSbnpAli+qiXpYiQoyJkVh9tJCpiPiaNkZidVEvV5EsHmsjsaaol6+IuA6qI7HuXAhjESFOlZFYdy6EtYjoT+5fivZcCG+RcqKiPRfCXaSYqOjPhbAXEWKfxon+wJEHImL7TW3H1fBB5CUg8i4Q0eBUZLrdDs2w3aYuReKzKaJz7FLkQ0AEIhDRiFg5h3htuc/2BvJ1VaO03flsj60z7XQVmTnsHaH+rInNo+Dzz3X40KaHED9J9BkS6/9luux/Ag//0hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMMR/C2lNcmMlc7kAAAAASUVORK5CYII="
              alt="Todo logo"
            />
            <figcaption>Add your list overhere</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggle ? (
              <i class="far fa-edit add-btn" onClick={addItems} />
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curr) => {
              return (
                <div className="eachItem" key={curr.id}>
                  <h3>{curr.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(curr.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(curr.id);
                      }}></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => setItems([])}>
              <span>Check All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
