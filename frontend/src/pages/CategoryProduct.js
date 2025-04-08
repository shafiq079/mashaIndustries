import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll('category');

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter toggle

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => (selectCategory[categoryKeyName] ? categoryKeyName : null))
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) =>
      index === arrayOfCategory.length - 1 ? `category=${el}` : `category=${el}&&`
    );

    navigate('/product-category?' + urlFormat.join(''));
  }, [selectCategory]);

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          className="w-full bg-red-600 text-white py-2 rounded-md"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[250px,1fr] gap-4">
        {/* Left Side (Filters) */}
        <div
          className={`bg-white p-4 rounded-md shadow-md ${
            isFilterOpen ? 'block' : 'hidden lg:block'
          } lg:min-h-[calc(100vh-120px)] lg:overflow-y-scroll`}
        >
          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName) => (
                <div key={categoryName.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side (Products) */}
        <div className="px-0 lg:px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-auto">
            {data.length !== 0 && !loading ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p className="text-center text-gray-500 mt-4">
                {loading ? 'Loading...' : 'No products found'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;