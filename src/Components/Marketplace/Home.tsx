import React from 'react'
import Categories from './Categories';
import MostViewed from './Groups/MostViewed';
import { ProductApis } from '../../apis/productApis';
import { AxiosResponse } from 'axios';
import { SvgElement, icontypesEnum } from '../assets/svgElement';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FaEye, FaWhatsapp } from 'react-icons/fa';
import configs from '../../configs';
import Modal from 'react-responsive-modal';
import { PaymentApis } from '../../apis/paymentApis';
import { ToastContainer, toast } from 'react-toastify';

//@ts-ignore
import { PhoneInput } from 'react-contact-number-input';

function Home() {

  const [products, setProducts] = React.useState<any>([]);
  const [loc, setLoc] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [fetchCategory, setFetchCategory] = React.useState('');
  const [loader, setLoader] = React.useState<boolean>(false);
  let [fullName, setFullName] = React.useState('');
  let [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  let [phoneNumber, setPhoneNumber] = React.useState<any>('');
  let [productQty, setProductQty] = React.useState<any>('');

  let [visible, setVisible] = React.useState(false);
  let [value, setvalue] = React.useState<any>('');

  function togglePaymentModal(value2: any) {
    setvalue(value2)
    setVisible(true)
  }

  const params = useParams();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()



  if (searchParams.get('status') == 'cancelled') {
    navigate(`/store/${params?.storeId}`);
  }


  if (searchParams.get('tx_ref')) {
    PaymentApis.getProdutCallback(searchParams.get('tx_ref')).then(
      (response: any) => {
        if (response?.data) {
          // navigate('/wallet');
          if (response?.data?.success === true) {
            if (response?.data?.data?.status == 'successful') {
              navigate(`/store/${params?.storeId}`);
              toast.success(response?.data?.data?.status);
            } else {
              // navigate('/mylinks');
              toast.error(response?.data?.data?.status);
              console?.log(response?.data)
            }

          }
        } else {
          // toast.warn('Invalid Login Credentials');
        }
      }
    ).catch(function (error) {
      // handle error
      console.log(error.response.data);
    }).finally(() => {
      // toast.error("No Internet Connection");

    });
  }


  const handlePayment = React.useCallback(
    (e: any) => {
      console?.log('hello')
      e.preventDefault();
      console?.log('hello2')
      let data = {
        'user_id': value?.user_id,
        'amount': ((value?.no_of_items) * productQty),
        'customer_full_name': fullName,
        'product_qty': productQty,
        'pay_for': value?.product_name,
        'store_id': params?.storeId,
        'customer_email': email,
        'customer_phone_number': phoneNumber?.countryCode + phoneNumber?.phoneNumber
      }
      PaymentApis.payForProduct(data).then(
        (response: any) => {
          if (response?.data?.success) {
            console.log(response?.data)
            window.location.replace(response?.data?.data?.data?.link);
            setVisible(false)
            // toast.success(response?.data?.message);
          }
        }
      ).catch(function (error) {
        // handle error
        console.log(error.response.data);
        toast.error("Offfline");
      }).finally(() => {
        //toast.error("No Internet Connection");

      });
    },
    [value, fullName, email, phoneNumber, params, productQty]
  );


  React.useEffect(() => {
    setLoader(true);
    const query: any = {
      search: search,
      name: loc,
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


  // React.useEffect(() => {
  //   setLoader(true);
  //   const query: any = {
  //     search: search,
  //     name: loc,
  //     categories: category
  //   };
  //   ProductApis.getAllProducts('', query).then(
  //     (response: AxiosResponse<any>) => {
  //       if (response?.data) {
  //         setProducts(response.data)
  //         console?.log(response?.data)
  //         setLoader(false);

  //         // console.log(response?.data?.data);
  //       }
  //     }
  //   ).catch(function (error: any) {
  //     // handle error
  //     console.log(error.response.data);
  //   })

  // }, [loc]);

  function Locate(location: any) {
     setLoader(true);
    setLoc(location);
    const query: any = {
      search: search,
      name: location,
      categories: category
    };
    ProductApis.getAllProducts('', query).then(
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

  }


  function cat(catItem: any) {
    setLoader(true);
    setLoc(location);
    const query: any = {
      search: search,
      name: loc,
      categories: catItem
    };
    ProductApis.getAllProducts('', query).then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          setProducts(response.data)
          setLoader(false);
          setFetchCategory(search !== '' ? search : catItem)
        }
      }
    ).catch(function (error: any) {
      // handle error
      console.log(error.response.data);
      console.log("new error");
    })

  }


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
        name: loc,
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

    }, [search, loc, category, fetchCategory]);

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

            <div className="flex justify-start">
              <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
              <select id="gender" defaultValue={category} onChange={e => setCategory(e.target.value)} name="programs_type" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                <option selected value="">All Categories</option>
                <option value="women fashion">Women's Fashion</option>
                <option value="men fashion">Men's Fashion</option>
                <option value="bags">Bags</option>
                <option value="sport/outdoor">Sport/Outdoor</option>
                <option value="home/kitchen">Home/Kitchen</option>
                <option value="clothing accessories">Clothing Accessories</option>
                <option value="shoes">Shoes</option>
                <option value="watches">Watches</option>
                <option value="keyboard & mice">Keyboard & mice</option>
                <option value="laptops">Laptops</option>
                <option value="phones">Phones</option>
              </select>
              <div className="relative w-auto md:w-[200px] lg:w-[500px]">
                <input type="text" defaultValue={search} onChange={e => setSearch(e.target.value)} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Type Keyword here..." />
                <button type="button" onClick={() => paginator('')} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-blue-200" style={{ backgroundColor: '#2196F3' }}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>

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
              <h3 className='mt-2'>Sort by</h3>
              <div>
                <form >
                  <div className="flex justify-start">
                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <select id="gender" defaultValue={loc} onChange={e => { setLoc(e.target.value); Locate(e.target.value); }} name="programs_type" className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-pointer">
                      <option value="" selected>- All State -</option>
                      <option value="Abuja FCT">Abuja FCT</option>
                      <option value="Abia">Abia</option>
                      <option value="Adamawa">Adamawa</option>
                      <option value="Akwa Ibom">Akwa Ibom</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Bauchi">Bauchi</option>
                      <option value="Bayelsa">Bayelsa</option>
                      <option value="Benue">Benue</option>
                      <option value="Borno">Borno</option>
                      <option value="Cross River">Cross River</option>
                      <option value="Delta">Delta</option>
                      <option value="Ebonyi">Ebonyi</option>
                      <option value="Edo">Edo</option>
                      <option value="Ekiti">Ekiti</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Gombe">Gombe</option>
                      <option value="Imo">Imo</option>
                      <option value="Jigawa">Jigawa</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Kano">Kano</option>
                      <option value="Katsina">Katsina</option>
                      <option value="Kebbi">Kebbi</option>
                      <option value="Kogi">Kogi</option>
                      <option value="Kwara">Kwara</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Nassarawa">Nassarawa</option>
                      <option value="Niger">Niger</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Ondo">Ondo</option>
                      <option value="Osun">Osun</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Sokoto">Sokoto</option>
                      <option value="Taraba">Taraba</option>
                      <option value="Yobe">Yobe</option>
                      <option value="Zamfara">Zamfara</option>
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
              <div className='block p-6 border-r border-b border-l border-gray-200 shadow'>
             
                

              <div className='flex space-x-2 mb-2  cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.SPORT} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('')}>All</h3>
                </div>


                <div className='flex space-x-2 mb-2  cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.WOMEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('women fashion')}>Women's Fashion</h3>
                </div>


                <div className='flex space-x-2 mb-2 py-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.MEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('men fashion')}>Men's Fashion</h3>
                </div>
                

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.BAGS} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('bags')}>Bags</h3>
                </div>
                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.SPORT} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('sport/outdoor')}>Sports/Outdoor</h3>
                </div>
                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('home/kitchen')}>Home/Kitchen</h3>
                </div>

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('clothing accessories')}>Clothing Accessories</h3>
                </div>

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('shoes')}>Shoes</h3>
                </div>

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('watches')}>Watches</h3>
                </div>

                
                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('keyboard & mice')}>Keyboards & Mice</h3>
                </div>

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('laptops')}>Laptops</h3>
                </div>

                <div className='flex space-x-2 mb-2 pb-3 cursor-pointer'>
                  <div className='mt-1'><SvgElement type={icontypesEnum.KITCHEN} /></div>
                  <h3 className='text-[#696969] text-sm' onClick={()=>cat('phones')}>Phones</h3>
                </div>


              </div>
            </div>
            <div className=' w-full mb-10'>
              <div className='pt-5'>
                {fetchCategory == '' ?
                  <h3 className='text-[#2196F3] font-medium'> All Item In Store</h3>
                  :
                  <h3 className='text-[#2196F3] font-medium'> Search results for  <span className=' text-gray-400'>{fetchCategory} </span></h3>
                }

                <hr className="h-px my-2 bg-gray-200 border-0 w-full" />
              </div>

              <div className=' mx-auto max-h-[600px] overflow-auto md:grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 md:gap-4  lg:space-y-0 py-8'>

                {!loader ? (
                  products.data?.data?.length >= 1 ?
                    products?.data?.data?.map(
                      (data: any, index: number) => (
                        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">

                          <NavLink to={`/storedetails/${(data?.id)}`} className={'cursor-pointer'}>
                            <p className="mb-2 tracking-tight m-2 p-2 bg-[#F4FBFF] h-44" style={{ fontSize: '16px', color: '#595959', backgroundImage: `url(${data?.product_image_1})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}>{data?.link_info?.message}</p>
                          </NavLink>
                          <hr />

                          <div className="flex flex-col pt-[16px] px-[16px]">
                            <div className="flex justify-start">
                              <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span>
                            </div>
                            <div className="flex justify-start mt-2">
                              {/* <span className="text-[16px] font-[600] mt-1">{data?.product_name}</span> */}
                              <span className="flex gap-2">
                                <span style={{ color: '#0071BC', textDecorationLine: 'line-through' }} className={`text-[15px] font-[700]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.product_price)} </span>
                                <span style={{ color: '#0071BC' }} className={`text-[15px] font-[400]`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)} </span>

                              </span>
                              {/* <span className="text-[#149E49] text-[14px] font-[600]"> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(data?.no_of_items)}</span> */}

                            </div>



                            <span className="text-[14px] font-[400] mt-3 text-[#808191] h-10 overflow-auto">{data?.product_description}</span>

                            <div className="flex justify-between py-3">

                              <NavLink to={`/storedetails/${data?.id}`}
                                style={{ backgroundColor: '#0071BC' }}
                                className={"text-[10px] text-white py-1  flex cursor-pointer rounded-full px-2"}
                              >
                                <FaEye className="mt-[2px] mr-1" />  View Product
                              </NavLink>

                              <a target='_blank' href={`${configs?.baseRedirect}/${data?.phone_number}`}
                                style={{ backgroundColor: '#0071BC' }}
                                className={"text-[10px] text-white pt-1 pb-1  flex cursor-pointer bg-[#0071BC] rounded-full px-2"}
                              >
                                <FaWhatsapp className="mt-[2px] mr-1" />  Contact Vendor
                              </a>

                              <span onClick={() => togglePaymentModal(data)}
                                style={{ backgroundColor: '#0071BC' }}
                                className={"text-[10px] text-white pt-1 pb-1 flex cursor-pointer bg-[#0071BC] rounded-full px-3"}
                              >
                                Pay with gupta
                              </span>
                            </div>

                          </div>


                          {/* <span className="flex justify-between gap-1 pt-4 m-2">
                         

                         
                        </span> */}
                        </div>
                      )
                    )
                    :

                    <div className="md:p-6 min-w-[70vw]">
                      <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">

                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className=" bg-gray-400 rounded-full text-center text-white mb-2.5"> No Product Availabe</div>

                      <div className="flex items-center mt-4 space-x-3">

                      </div>

                    </div>

                )
                  :
                  <div className="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '70vh', width: '92vw' }}>
                    <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-400">

                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                    <div className="flex items-center mt-4 space-x-3">

                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                }


              </div>

              <div className=' m-4 mt-10 flex justify-end'>
                {
                  products?.data?.links?.filter(((item: any, idx: any) => idx < 1000)).map(
                    (datas: any, index: any) => (
                      <button onClick={() => paginator(datas?.label == 'Next &raquo;' ? datas?.url.charAt(datas?.url.length - 1) : (datas?.label === '&laquo; Previous') ? datas?.url.charAt(datas?.url.length - 1) : datas?.label)} disabled={datas?.active} className={'mx-1 py-1 px-2 ' + (datas?.active == false ? 'bg-gray-300 text-black ' : `bg-['#0071BC'}] text-white`)} style={{ backgroundColor: `${datas?.active == false ? 'rgb(209 213 219' : ('#0071BC')}` }}>
                        {datas?.label == '&laquo; Previous' ? '< Previous' : (datas?.label === 'Next &raquo;') ? 'Next  >' : datas?.label}
                      </button>
                    )
                  )
                }

              </div>


              {/* <MostViewed data={products} loading={loader} title={fetchCategory} /> */}
              {/* <div className='pt-5'>
                <h3 className='text-[#2196F3] font-medium'>Most Viewed Items</h3>
                <hr className="h-px my-2 bg-gray-200 border-0"></hr>
              </div>
              <div className=' mx-auto  space-y-8 lg:grid lg:grid-cols-5 xl:gap-4  lg:space-y-0'></div> */}
            </div>
          </div>
        </section>
      </div>



      <section>
        <Modal
          open={visible}

          onClose={() => setVisible(false)}
        >
          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <span className="flex justify-end pr-2 pt-2">
              <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>
            <div className=" bg-[#fff]  items-center rounded-lg p-1 px-4">

              <div className="">


                <label
                  className="flex justify-start  mb-2 pt-1 text-md font-bold text-black"
                >
                  You are about to pay for <br />{value?.product_name}
                </label>


                <form onSubmit={handlePayment} className="pb-4 rounded-lg">

                  <label className="block mb-2 mt-3 text-sm  text-gray-900 dark:text-gray-600">Full Name</label>
                  <input required type="text" name="full_name" onChange={(e) => setFullName(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Full Name" />

                  <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Email</label>
                  <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your Email" />


                  <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Quantity</label>
                  <input required type="number" name="productQty" onChange={(e) => setProductQty(e.target.value)} className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Paying for how many?" />

                  <label className="block mb-2 mt-2 text-sm  text-gray-900 dark:text-gray-600">Phone Number</label>
                  <PhoneInput
                    style={{ backgroundColor: '#F4FBFF' }}
                    disabled={false}
                    name="phone"
                    required
                    // containerClass={"shadow-sm bg-gray-100 block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "}
                    countryCode={'ng'}
                    onChange={setPhoneNumber}
                    placeholder={'Enter Mobile Number'}
                  />

                  <span className=" text-red-500 text-[10px]">{phoneNumber?.message}</span>

                  {/* <input required type="text"  id="customer_full_name" onChange={(e)=>setPhoneNumber(e.target.value)} class="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Your phone number" /> */}



                  <span className="flex justify-center pt-4">
                    <button
                      type="submit"
                      style={{ backgroundColor: `${'#0071BC'}`, borderRadius: '50px' }}
                      className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Proceed to payment
                    </button>
                  </span>

                  <span className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={(e) => setVisible(false)}
                      style={{ borderRadius: '50px' }}
                      className=" text-black bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Cancel
                    </button>
                  </span>

                </form>



              </div>

            </div>

          </div>
        </Modal>
      </section>


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

    </>
  );
}

export default Home;
