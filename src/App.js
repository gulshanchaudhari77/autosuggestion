import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [food, setfood] = useState("");

  const [listdata, setlistdata] = useState([]);

  const [bucket, setbucket] = useState([]);

  const changeHandler = (e) => {
    console.log(e.target.value);
    setfood(e.target.value);
  };

  const fetchData = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    setlistdata(data);
  };

  const deleteHandler = (id) => {
    const updatedBucket = bucket.filter((item) => item.id !== id);
    setbucket(updatedBucket);

    toast.error("Item removed from the bucket!", {
      position: "top-right",
      autoClose: 2000, // Auto-close the toast after 2 seconds
    });
  };


  const markAsDoneHandler = (id) => {
    const updatedBucket = bucket.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setbucket(updatedBucket);

     
  };



  const clickHandler = (e) => {
    console.log(e.target.getAttribute("data-id"));

    const index = e.target.getAttribute("data-id");

    if (index) {
      //obje banayenge
      const obj = {
        id: Date.now(),
        data: listdata[index],
        isDone: false,
      };
      const copybucketlist = [...bucket];
      copybucketlist.push(obj);
      setbucket(copybucketlist);

      toast.success("item Added!",{
        position:"top-right",
        autoClose:2000,
       })
    }
  };
  console.log(bucket);

  useEffect(() => {
    if (food.length >= 1) {
      fetchData(food);
    }
  }, [food]);


  return (
    <div className="app">
      <h1>Auto-Sugestion</h1>
      <div>
        <input type="text" value={food} onChange={changeHandler} placeholder="enter Name" />
        
      </div>

      <div className="shoping-list" onClick={clickHandler}>
        {listdata.map((ele, index) => {
          return <div data-id={index}>{ele}</div>;
        })}
      </div>

      <div className="bucket">
        <div>
          {/* Conditional rendering: If bucket is empty, show static content */}
          {bucket.length === 0 ? (
            <div className="bucketinner static">
              <button>✓</button> {/* Static right arrow */}
              <span>**********</span>
              <button>X</button> {/* Static wrong arrow */}
            </div>
          ) : (
            /* Render actual bucket data if available */
            bucket.map((ele) => {
              return (
                <div className="bucketinner" key={ele.id}>
                  <button onClick={() => markAsDoneHandler(ele.id)}>✓</button>
                  <span className={ele.isDone ? "blurred" : ""}>
                    {ele.data}
                  </span>
                  <button onClick={() => deleteHandler(ele.id)}>X</button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;
