import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Jewelry");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setLoading(true);
        const resData = await fetch(
          "https://endgame-job-task-server.vercel.app/api/products"
        );
        const data = await resData?.json();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.log("here the error", error);
      } finally {
        setLoading(false);
      }
    };
    dataFetch();
  }, []);

  useEffect(() => {
    const filterData = selectedCategory === "All" ? data : data?.filter((item) => item.category === selectedCategory);
    setFilteredData(filterData);
  }, [data, selectedCategory])



  // filter data
  const handleCategory = async (category) => {
    setSelectedCategory(category)
  };
  console.log("selectedCategory", selectedCategory);
  console.log("data", filteredData);


  // make a array by filtering data
  let categoryArray = [];
  for (let i = 0; i < data?.length; i++) {
    let cate = data[i].category;

    if (!categoryArray.includes(cate)) {
      categoryArray.push(cate);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-start h-screen">
        <p> Loading</p>{" "}
      </div>
    );



  return (
    <>
      <div className="mb-10">
        <code className="text-2xl font-bold ">Hello world!</code>
        <br />
        <code>
          This a task for job, which one did when HR manager give me to do. And
          i did it with love
        </code>
        <br />
        <code>just make it more beautiful</code>
      </div>

      <Tabs>
        <div className="overflow-x-auto">
          <TabList className='inline-flex mb-4 space-x-4 '>
            <div> <button className={` ${selectedCategory === "All" ? "border-b-2 border-gray-400" : " " } `} onClick={() => setSelectedCategory("All")}> All </button> </div>
            {categoryArray?.map((category, index) => (
              <Tab className={`${selectedCategory !== "All" ? "whitespace-nowrap border-b-2 cursor-pointer" : " "}`} onClick={() => handleCategory(category)} key={index}>
                {category}
              </Tab>
            ))}
          </TabList>
        </div>

        {categoryArray?.map((category, index) => (
          <TabPanel key={index}>
            {filteredData?.length > 0 ? (
              <div className="md:grid grid-cols-3 gap-4">
                {filteredData?.map((item) => (
                  <div key={item._id} className="p-4 max-w-md">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="h-48 w-full object-cover object-center"
                        src={item.photoUrl || "https://dummyimage.com/720x400"}
                        alt={item.name}
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          CATEGORY {category}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {item.name}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center flex-wrap">
                          <a href="" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Learn More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5l7 7-7 7" />
                            </svg>
                          </a>
                          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            price : {item.price}
                          </span>
                          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            {item.brand}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No data available for this category.</p>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}

export default App;
