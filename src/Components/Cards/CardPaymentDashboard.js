import React from "react";
import { AdminApis } from "../../apis/adminApi";
import { FaTrash, FaEdit } from "react-icons/fa";
import CardNavBar from "./CardNavBar";
import { useSelector, useDispatch } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal';
import configs from "../../configs";
import CardPageVisits from "./CardPageVisits";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import CardRenewSubscription from "./CardRenewSubscription";
import { PaymentApis } from "../../apis/paymentApis";


// components

export default function CardPaymentDashboard() {

  const userLoginData = useSelector((state) => state.data.login.value);
  let [visible, setVisible] = React.useState(false);
 


  


  const [loader, setLoader] = React.useState(true);
  function isCopied() {
    toast.success("Copied to Clipboard");
  }

  let [balance, setBalance] = React.useState([]);

  let [refresh, setRefresh] = React.useState(false);

  const [transactionList, setTransactionList] = React.useState([]);

  React.useEffect(() => {
    setLoader(true);
    PaymentApis.getTransactions().then(
      (response) => {
        if (response?.data) {
          setTransactionList(response?.data?.data?.transactions)
          setBalance(response?.data?.data?.walletDetails)
          setLoader(false);
          // window.location.reload();
         
        }
      }
    );

  }, [refresh]);


  const paginator = React.useCallback(
    (value) => {
      //   setLoader(true);
      let value2 = '';
      if (value !== null) {
        value2 = value;
      } else {
        value2 = ''
      }

      PaymentApis.getTransactions(value2).then(
        (response) => {
          if (response?.data) {
            setTransactionList(response?.data?.data?.transactions)
            setBalance(response?.data?.data?.walletDetails)
          }
        }
      ).catch(function (error) {
        console.log(error.response.data);
      })

    }, [transactionList]);


    const [bankCode, setBankCode] = React.useState("");
    const [accontNumber, setAccountNumber] = React.useState("");
    const [amount, setAmount] = React.useState("");

    const witdrawFund = React.useCallback(
      (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('account_bank', bankCode)
        formData.append('account_number', accontNumber)
        formData.append('amount', amount)
  
        if( parseInt(balance?.total_amount) >= parseInt(amount)){
          console.log(balance?.total_amount)
          PaymentApis.requestWitdrawal(formData).then(
            (response) => {
              if (response?.data) {
                toast.success(response?.data?.message);
                setVisible(false)
                setRefresh(!refresh)
              } else {
                setVisible(false)
                toast.error(response?.response?.data?.message);
    
              }
    
              // toast.success(response?.data?.message);
            }
          ).catch(function (error) {
            // handle error
            // console.log(error.response);
            setVisible(false)
            toast.error(error.response.data.message);
          })
        }else{
          toast.error("Insufficient Funds !!!");
          setVisible(false);
        }
       
      },
      [bankCode,accontNumber,amount,visible,balance,refresh]
    );




  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="lg:flex rounded-t mb-0 mt-5 md:py-3 p-1 border-0">

          <div className="lg:w-1/3 w-3/3">
            <div class="max-w-full bg-gradient-to-b  from-[#0071BC] to-[#024471] rounded-lg border border-gray-200 shadow-md px-3 py-2">
              <div>
                <span className=" text-white text-[20px]">Wallet</span>
              </div>

              <div className="flex justify-center mt-[33px]">
                <div className="text-white">Gupta Balance</div>
              </div>

              <div className="flex justify-center mt-[54px]">
                <div className="text-white text-[44px] font-[700] ">{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((balance?.total_amount) ? (balance?.total_amount) : 0.0))}</div>
              </div>

              <div className="flex justify-center mt-[44px] mb-[20px]">
                <button
                  type="button"
                  onClick={(e) => setVisible(true)}
                  className=" text-[#0071BC] font-medium bg-white rounded-[20px] text-sm w-full py-2.5 text-center "
                >
                  Witdraw Funds
                </button>
              </div>
            </div>
          </div>


          <div className="lg:w-2/3 w-3/3 mt-3">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  gap-3 mx-3">
              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Revenue</span>
                    <span>$300</span>
                  </span>

                  <span>
                    <svg width="85" height="72" viewBox="0 0 85 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group 631877">
                        <text id="+ 22%" fill="#0071BC" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Inter" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="37.5762" y="16.0909">+ 32%</tspan></text>
                        <g id="Vector 4" filter="url(#filter0_d_734_1181)">
                          <path d="M5 55.3152C7.01238 56.1501 12.3839 56.0894 17.7709 49.1671C24.5046 40.5143 30.774 42.7913 38.2043 52.5827C45.6347 62.3741 50.743 67.156 58.4056 53.7213C66.0681 40.2866 66.9969 35.7325 80 33" stroke="#0071BC" stroke-width="3" />
                        </g>
                      </g>
                      <defs>
                        <filter id="filter0_d_734_1181" x="0.424805" y="31.5321" width="83.8838" height="39.9683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.278431 0 0 0 0 0.941176 0 0 0 0.16 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_734_1181" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_734_1181" result="shape" />
                        </filter>
                      </defs>
                    </svg>

                  </span>

                </div>
              </div>

              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Revenue</span>
                    <span>$300</span>
                  </span>

                  <span>
                    <svg width="94" height="72" viewBox="0 0 94 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group 631878">
                        <text id="- 25%" fill="#FF392B" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Inter" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="49.3242" y="16.0909">- 25%</tspan></text>
                        <g id="Vector 5" filter="url(#filter0_d_734_1182)">
                          <path d="M5 62C8.47023 61.3005 16.278 57.5515 22.2728 48.0965C23.7212 45.8122 25.0841 43.442 26.9605 41.4938C37.3448 30.7122 51.3764 28.3638 64.9623 45.3392C76.7962 60.1257 85.9182 59.8306 89 57.8348" stroke="#FF392B" stroke-width="3" />
                        </g>
                      </g>
                      <defs>
                        <filter id="filter0_d_734_1182" x="0.703125" y="31.5" width="93.1123" height="39.9705" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.223529 0 0 0 0 0.168627 0 0 0 0.16 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_734_1182" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_734_1182" result="shape" />
                        </filter>
                      </defs>
                    </svg>


                  </span>

                </div>
              </div>

              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Revenue</span>
                    <span>$300</span>
                  </span>

                  <span>
                    <svg width="85" height="72" viewBox="0 0 85 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group 631879">
                        <text id="+ 49%" fill="#279F51" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Inter" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="36.4824" y="16.0909">+ 49%</tspan></text>
                        <g id="Vector 4" filter="url(#filter0_d_734_1183)">
                          <path d="M5 55.3152C7.01238 56.1501 12.3839 56.0894 17.7709 49.1671C24.5046 40.5143 30.774 42.7913 38.2043 52.5827C45.6347 62.3741 50.743 67.156 58.4056 53.7213C66.0681 40.2866 66.9969 35.7325 80 33" stroke="#279F51" stroke-width="3" />
                        </g>
                      </g>
                      <defs>
                        <filter id="filter0_d_734_1183" x="0.424805" y="31.5321" width="83.8838" height="39.9683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.588235 0 0 0 0 0.32549 0 0 0 0.16 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_734_1183" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_734_1183" result="shape" />
                        </filter>
                      </defs>
                    </svg>

                  </span>

                </div>
              </div>

              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Revenue</span>
                    <span>$300</span>
                  </span>

                  <span>
                    <svg width="98" height="72" viewBox="0 0 98 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group 631880">
                        <text id="+ 1.9%" fill="#0071BC" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Inter" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="47.9512" y="16.0909">+ 1.9%</tspan></text>
                        <g id="Vector 8" filter="url(#filter0_d_734_1184)">
                          <path d="M6 59.8065C12.289 47.1919 16.7057 37.4762 45.5166 57.6716C47.5128 59.0709 49.6088 60.4395 51.9223 61.2078C75.1908 68.9359 67.1894 25.9988 93 36.8275" stroke="#0071BC" stroke-width="3" />
                        </g>
                      </g>
                      <defs>
                        <filter id="filter0_d_734_1184" x="0.657227" y="33.5659" width="96.9229" height="38.0789" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.6 0 0 0 0 0.290196 0 0 0 0.16 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_734_1184" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_734_1184" result="shape" />
                        </filter>
                      </defs>
                    </svg>

                  </span>

                </div>
              </div>

            </div>

          </div>

        </div>


        <div className="px-4 mt-10">
          <div>
            <span className="font-[700]">Transaction History</span>
          </div>
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 bg-gray-50 ">
                <tr>
                  <th></th>
                  <th scope="col" className="px-6 py-3">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid For
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  {/* <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th> */}
                </tr>
              </thead>

              <tbody>
                {
                  transactionList?.data?.filter((data) => data?.role !== 'admin')?.map(
                    (datas, index) => (
                      <tr className="bg-white  ">

                        <td className="px-6 py-4">
                          {index + 1}
                        </td>


                        <td className="px-6 py-4">
                          {datas?.customer_name}
                        </td>
                        <td className="px-6 py-4">
                          {datas?.customer_email}
                        </td>
                        <td className="px-6 py-4">
                          {datas?.customer_phone_number}
                        </td>
                        <td className="px-6 py-4">
                          {datas?.paying_for}
                        </td>
                        <td className="px-6 py-4">
                          {datas?.amount_paid}
                        </td>
                        <td className="px-6 py-4">
                          {datas?.product_qty}
                        </td>




                      </tr>
                    )
                  )
                }

              </tbody>

            </table>
          </div>
          <div className='m-4'>
            {
              transactionList?.links?.filter(((item, idx) => idx < 1000)).map(
                (datas, index) => (
                  <button onClick={() => paginator(datas?.label == 'Next &raquo;' ? datas?.url.charAt(datas?.url.length - 1) : (datas?.label === '&laquo; Previous') ? datas?.url.charAt(datas?.url.length - 1) : datas?.label)} disabled={datas?.active} className={'mx-1 py-1 px-2 ' + (datas?.active == false ? 'bg-gray-300 text-black ' : 'bg-[#0071BC] text-white')}>
                    {datas?.label == '&laquo; Previous' ? '< Previous' : (datas?.label === 'Next &raquo;') ? 'Next  >' : datas?.label}
                  </button>
                )
              )
            }

          </div>
        </div>

      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}

      </div>



      <section>
        <Modal
          visible={visible}
          width="400"
          height="500"
          effect="fadeInUp"
          onClickAway={() => setVisible(false)}
        >
          <div className=" " style={{ height: '100%', overflow: 'auto' }}>
            <span className="flex justify-end pr-2 pt-2">
              <p className="cursor-pointer font-bold" onClick={(e) => setVisible(false)}><SvgElement type={icontypesEnum.CANCEL} /></p>
            </span>
            <div className=" bg-[#fff]  items-center rounded-lg p-1 px-4">

              <div className="">

                <span className="flex justify-around">
                  {/* <h1 className=" text-xs text-red-600" style={{ fontSize: '10px' }}>Link can’t be edited in free plan. <span style={{ color: '#61A24F' }} className="font-bold text-xs">Upgrade to Pro</span></h1> */}

                </span>

                <label
                  className="flex justify-start  mb-2 pt-2 text-md font-bold text-black"
                >
                  You are about to make a witdrawal 💰
                </label>




                <form onSubmit={witdrawFund} className="pb-4 rounded-lg">
                  <div className="mb-6 ">
                    <label
                      className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                      Select Bank
                    </label>
                    <select onChange={(e)=>setBankCode(e?.target?.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-2 w-full">
                      <option selected disabled>Choose Bank</option>
                      <option value="044">Access Bank</option>
                      <option value="011">First Bank</option>
                      <option value="058">Guaranty Trust Bank (GTB)</option>
                      <option value="035">Wema Bank</option>
                      <option value="033">United Bank for Africa (UBA)</option>
                    </select>
                  </div>

                  <div className="mb-6 ">
                    <label className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                      Enter Account Number
                    </label>
                    <input onChange={(e)=>setAccountNumber(e?.target?.value)} type="number" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Account Number" style={{ backgroundColor: '#F5F5F5' }} />
                  </div>

                  <div className="mb-6 ">
                    <label className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                    Amount You are About to witdraw?
                    </label>
                    <input type="number" onChange={(e)=>setAmount(e?.target?.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="20000" style={{ backgroundColor: '#F5F5F5' }} />
                  </div>

                  <span className="flex justify-center pt-4">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                      className=" text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center "
                    >
                      Proceed to witdrawal
                    </button>
                  </span>

                 

                </form>



              </div>

            </div>

          </div>
        </Modal>
      </section>


      <ToastContainer
        position="bottom-left"
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
