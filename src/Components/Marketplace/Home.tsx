import React from 'react'
import Categories from './Categories';
import MostViewed from './Groups/MostViewed';
import { ProductApis } from '../../apis/productApis';
import { AxiosResponse } from 'axios';
import { SvgElement, icontypesEnum } from '../assets/svgElement';

function Home() {

  const [products, setProducts] = React.useState<any>([]);
  const [name, setname] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [fetchCategory, setFetchCategory] = React.useState('');
  const [loader, setLoader] = React.useState<boolean>(false);


  React.useEffect(() => {
    setLoader(true);
    const query: any = {
      search: search,
      name: name,
      categories: category
    };
    ProductApis.getAllProducts('', query).then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          setProducts(response.data)
          console?.log(response?.data)
          setLoader(false);

          // console.log(response?.data?.data);
        }
      }
    ).catch(function (error: any) {
      // handle error
      console.log(error.response.data);
    })

  }, []);


  const paginator = React.useCallback(
    (value: any) => {
      setLoader(true);
      let value2 = '';
      if (value !== null) {
        value2 = value;
      } else {
        value2 = ''
      }
      const query: any = {
        search: search,
        name: name,
        categories: category
      };
      ProductApis.getAllProducts(value2, query).then(
        (response: AxiosResponse<any>) => {
          if (response?.data) {
            setProducts(response.data)
            setLoader(false);
            setFetchCategory(search !== '' ? search : category)
          }
        }
      ).catch(function (error: any) {
        // handle error
        console.log(error.response.data);
        console.log("new error");
      })

    }, [search, name, category, fetchCategory]);

  return (
    <>
      <nav className="bg-[#2196F3]  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 py-3">
          <div className="flex items-center">
            <span className="self-center text-base font-medium text-white whitespace-nowrap ">Welcome to Gupta Marketplace</span>
          </div>
          <div className="flex items-center">
            <div className='border-r border-white'>
              <span className='pr-1 text-base  text-white cursor-pointer hover:underline'>Login</span>
            </div>
            <div className=''>
              <span className='pr-1 pl-1 text-base  text-white cursor-pointer hover:underline'>Register</span>
            </div>


          </div>
        </div>
      </nav>


      <nav className="bg-white ">

        <div className="md:flex grid md:justify-between md:px-16 py-3 gap-10 ml-5 md:ml-1">
          <div>
            <SvgElement type={icontypesEnum.BARS} />
          </div>

          <div className=''>
            <form >
              <div className="flex justify-start">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <select id="gender" defaultValue={category} onChange={e => setCategory(e.target.value)} name="programs_type" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                  <option selected value="">All Categories</option>
                  <option value="women fashion">Women's Fashion</option>
                  <option value="men fashion">Men's Fashion</option>
                  <option value="bags">Bags</option>
                  <option value="sport/outdoor">Sport/Outdoor</option>
                  <option value="home/kitchen">Home/Kitchen</option>
                  <option value="shoes">Shoes</option>
                  <option value="watches">Watches</option>
                  <option value="keyboard & mice">Keyboard & mice</option>
                  <option value="laptops">Laptops</option>
                  <option value="phones">Phones</option>
                </select>
                <div className="relative w-auto md:w-[200px] lg:w-[500px]">
                  <input type="text" defaultValue={search} onChange={e => setSearch(e.target.value)} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Type Keyword here..." required />
                  <button type="button" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => paginator('')} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-blue-200" style={{ backgroundColor: '#2196F3' }}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div>

          </div>

        </div>

        <div className=''>
          <hr className="h-1 my-2 bg-[#2196F3] border-0" />
        </div>

      </nav>



<div className='md:px-8 px-4'>
      
      <section className="py-3" >
        <div className="bg-gray-50 py-2 px-1 flex justify-between">
          <div className='flex space-x-3'>
            <h3>Sort by</h3>
            <div>
              <form >
                <div className="flex justify-start">
                  <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                  <select id="gender" className=" inline-flex  py-1.5 px-2 text-xs font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                    <option selected>Select Group</option>
                    <option value="Best Selling">Best Selling</option>
                    <option value="recommended">Recommended</option>
                    <option value="fairly used">Fairly Used</option>
                    <option value="trending">Trending</option>
                    <option value="mos viewed">Most Viewed</option>
                  </select>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
     

      
      <section className=" py-3" >
        <div className=' mx-auto  grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 '>
          <img src="./images/ads1.png" className="" alt="Samosex Logo" />
          <img src="./images/ads2.png" className="" alt="Samosex Logo" />
          <img src="./images/ads3.png" className="" alt="Samosex Logo" />
        </div>
      </section>
     
      <section className=" py-3" >
        <div className='flex flex-row md:space-x-4'>
          <div className='basis-3/12 hidden md:block'>
            <Categories />
          </div>
          <div className=' w-full'>
            <MostViewed data={products} loading={loader} title={fetchCategory} />
            {/* <div className='pt-5'>
                <h3 className='text-[#2196F3] font-medium'>Most Viewed Items</h3>
                <hr className="h-px my-2 bg-gray-200 border-0"></hr>
              </div>
              <div className=' mx-auto  space-y-8 lg:grid lg:grid-cols-5 xl:gap-4  lg:space-y-0'></div> */}
          </div>
        </div>
      </section>
      </div>

    </>
  );
}

export default Home;
