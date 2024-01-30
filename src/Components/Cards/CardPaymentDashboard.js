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
  const [lastTransaction, setLastTransaction] = React.useState([]);
  const [lastDeposit, setLastDeposit] = React.useState([]);

  React.useEffect(() => {
    setLoader(true);
    PaymentApis.getTransactions().then(
      (response) => {
        if (response?.data) {
          setTransactionList(response?.data?.data?.transactions)
          setBalance(response?.data?.data?.walletDetails)
          setLastTransaction(response?.data?.data?.witdrawal)
          setLastDeposit(response?.data?.data?.deposit)
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

      if (parseInt(balance?.total_amount) >= parseInt(amount)) {
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
      } else {
        toast.error("Insufficient Funds !!!");
        setVisible(false);
      }

    },
    [bankCode, accontNumber, amount, visible, balance, refresh]
  );




  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">

        <div className="bg-blue-100  rounded-lg ml-3 m-1 p-2">
          <span className=" bg-blue-100  rounded-lg  text-gray-500 font-bold text-[12px]"><span className=" text-red-500 bg-red-200 p-1 px-3 rounded-full text-[15px]">!</span><br />  Dear vendors, your trust is crucial. Any suspicious activity or abnormal transactions may lead to an account lock. We're committed to maintaining a secure platform for everyone. Thank you for your understanding.</span>
        </div>
        <div className="lg:flex rounded-t mb-0 mt-5 md:py-3 p-1 border-0">

          <div className="lg:w-1/3 w-3/3 ml-3">
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
                    <span>Previous Balance</span>
                    <span className="font-bold">{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((balance?.total_amount) ? (balance?.previous_amount) : 0.0))}</span>
                  </span>

                  <span>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="28" cy="28" r="28" fill="#D0FDE2" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M28.026 16C25.0147 16 22.2713 16.9947 20.648 17.8073C20.5013 17.8807 20.3647 17.9527 20.2373 18.022C19.9853 18.1593 19.7707 18.2873 19.6 18.4L21.4467 21.1187L22.316 21.4647C25.7133 23.1787 30.2693 23.1787 33.6673 21.4647L34.654 20.9527L36.4 18.4C36.0384 18.164 35.6623 17.951 35.274 17.762C33.6587 16.958 30.9807 16 28.0267 16M23.732 19.0773C23.0781 18.955 22.4322 18.7929 21.798 18.592C23.3187 17.9167 25.5847 17.2 28.0267 17.2C29.718 17.2 31.3173 17.544 32.64 17.98C31.09 18.198 29.436 18.568 27.86 19.0233C26.62 19.382 25.1707 19.3433 23.732 19.0773ZM34.372 22.4533L34.208 22.536C30.4707 24.4213 25.5133 24.4213 21.776 22.536L21.6207 22.4573C16.0053 28.618 11.7187 39.998 28.026 39.998C44.3333 39.998 39.9427 28.4067 34.372 22.4533ZM27.3333 28C26.9797 28 26.6406 28.1405 26.3905 28.3905C26.1405 28.6406 26 28.9797 26 29.3333C26 29.687 26.1405 30.0261 26.3905 30.2761C26.6406 30.5262 26.9797 30.6667 27.3333 30.6667V28ZM28.6667 26.6667V26H27.3333V26.6667C26.6261 26.6667 25.9478 26.9476 25.4477 27.4477C24.9476 27.9478 24.6667 28.6261 24.6667 29.3333C24.6667 30.0406 24.9476 30.7189 25.4477 31.219C25.9478 31.719 26.6261 32 27.3333 32V34.6667C26.7533 34.6667 26.2593 34.2967 26.0753 33.778C26.048 33.6931 26.004 33.6146 25.9458 33.5471C25.8876 33.4795 25.8165 33.4244 25.7366 33.3848C25.6568 33.3452 25.5698 33.3221 25.4808 33.3167C25.3918 33.3113 25.3027 33.3239 25.2186 33.3536C25.1346 33.3833 25.0573 33.4295 24.9915 33.4896C24.9256 33.5497 24.8725 33.6223 24.8352 33.7033C24.7979 33.7843 24.7772 33.8719 24.7744 33.961C24.7715 34.0501 24.7866 34.1388 24.8187 34.222C25.0026 34.742 25.3431 35.1922 25.7935 35.5106C26.2438 35.829 26.7818 36 27.3333 36V36.6667H28.6667V36C29.3739 36 30.0522 35.719 30.5523 35.219C31.0524 34.7189 31.3333 34.0406 31.3333 33.3333C31.3333 32.6261 31.0524 31.9478 30.5523 31.4477C30.0522 30.9476 29.3739 30.6667 28.6667 30.6667V28C29.2467 28 29.7407 28.37 29.9247 28.8887C29.952 28.9735 29.996 29.052 30.0542 29.1196C30.1124 29.1871 30.1835 29.2423 30.2634 29.2819C30.3432 29.3215 30.4302 29.3446 30.5192 29.35C30.6082 29.3553 30.6973 29.3428 30.7814 29.3131C30.8654 29.2834 30.9427 29.2371 31.0085 29.1771C31.0744 29.117 31.1275 29.0443 31.1648 28.9634C31.2021 28.8824 31.2228 28.7948 31.2256 28.7057C31.2285 28.6166 31.2134 28.5278 31.1813 28.4447C30.9974 27.9247 30.6569 27.4745 30.2065 27.1561C29.7562 26.8377 29.2182 26.6667 28.6667 26.6667ZM28.6667 32V34.6667C29.0203 34.6667 29.3594 34.5262 29.6095 34.2761C29.8595 34.0261 30 33.687 30 33.3333C30 32.9797 29.8595 32.6406 29.6095 32.3905C29.3594 32.1405 29.0203 32 28.6667 32Z" fill="#32D171" />
                    </svg>
                  </span>

                </div>
              </div>

              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Last Witdrawal</span>
                    <span className="font-bold">{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((lastTransaction?.amount) ? (lastTransaction?.amount) : 0.0))}</span>
                  </span>

                  <span>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="28" cy="28" r="28" fill="#FDE3E2" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M28.026 16C25.0147 16 22.2713 16.9947 20.648 17.8073C20.5013 17.8807 20.3647 17.9527 20.2373 18.022C19.9853 18.1593 19.7707 18.2873 19.6 18.4L21.4467 21.1187L22.316 21.4647C25.7133 23.1787 30.2693 23.1787 33.6673 21.4647L34.654 20.9527L36.4 18.4C36.0384 18.164 35.6623 17.951 35.274 17.762C33.6587 16.958 30.9807 16 28.0267 16M23.732 19.0773C23.0781 18.955 22.4322 18.7929 21.798 18.592C23.3187 17.9167 25.5847 17.2 28.0267 17.2C29.718 17.2 31.3173 17.544 32.64 17.98C31.09 18.198 29.436 18.568 27.86 19.0233C26.62 19.382 25.1707 19.3433 23.732 19.0773ZM34.372 22.4533L34.208 22.536C30.4707 24.4213 25.5133 24.4213 21.776 22.536L21.6207 22.4573C16.0053 28.618 11.7187 39.998 28.026 39.998C44.3333 39.998 39.9427 28.4067 34.372 22.4533ZM27.3333 28C26.9797 28 26.6406 28.1405 26.3905 28.3905C26.1405 28.6406 26 28.9797 26 29.3333C26 29.687 26.1405 30.0261 26.3905 30.2761C26.6406 30.5262 26.9797 30.6667 27.3333 30.6667V28ZM28.6667 26.6667V26H27.3333V26.6667C26.6261 26.6667 25.9478 26.9476 25.4477 27.4477C24.9476 27.9478 24.6667 28.6261 24.6667 29.3333C24.6667 30.0406 24.9476 30.7189 25.4477 31.219C25.9478 31.719 26.6261 32 27.3333 32V34.6667C26.7533 34.6667 26.2593 34.2967 26.0753 33.778C26.048 33.6931 26.004 33.6146 25.9458 33.5471C25.8876 33.4795 25.8165 33.4244 25.7366 33.3848C25.6568 33.3452 25.5698 33.3221 25.4808 33.3167C25.3918 33.3113 25.3027 33.3239 25.2186 33.3536C25.1346 33.3833 25.0573 33.4295 24.9915 33.4896C24.9256 33.5497 24.8725 33.6223 24.8352 33.7033C24.7979 33.7843 24.7772 33.8719 24.7744 33.961C24.7715 34.0501 24.7866 34.1388 24.8187 34.222C25.0026 34.742 25.3431 35.1922 25.7935 35.5106C26.2438 35.829 26.7818 36 27.3333 36V36.6667H28.6667V36C29.3739 36 30.0522 35.719 30.5523 35.219C31.0524 34.7189 31.3333 34.0406 31.3333 33.3333C31.3333 32.6261 31.0524 31.9478 30.5523 31.4477C30.0522 30.9476 29.3739 30.6667 28.6667 30.6667V28C29.2467 28 29.7407 28.37 29.9247 28.8887C29.952 28.9735 29.996 29.052 30.0542 29.1196C30.1124 29.1871 30.1835 29.2423 30.2634 29.2819C30.3432 29.3215 30.4302 29.3446 30.5192 29.35C30.6082 29.3553 30.6973 29.3428 30.7814 29.3131C30.8654 29.2834 30.9427 29.2371 31.0085 29.1771C31.0744 29.117 31.1275 29.0443 31.1648 28.9634C31.2021 28.8824 31.2228 28.7948 31.2256 28.7057C31.2285 28.6166 31.2134 28.5278 31.1813 28.4447C30.9974 27.9247 30.6569 27.4745 30.2065 27.1561C29.7562 26.8377 29.2182 26.6667 28.6667 26.6667ZM28.6667 32V34.6667C29.0203 34.6667 29.3594 34.5262 29.6095 34.2761C29.8595 34.0261 30 33.687 30 33.3333C30 32.9797 29.8595 32.6406 29.6095 32.3905C29.3594 32.1405 29.0203 32 28.6667 32Z" fill="#EE1717" />
                    </svg>

                  </span>

                </div>
              </div>

              <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
                <div className="flex justify-between">
                  <span className="flex flex-col">
                    <span>Last Deposit</span>
                    <span className="font-bold">{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((lastDeposit?.amount_paid) ? (lastDeposit?.amount_paid) : 0.0))}</span>
                  </span>

                  <span>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="28" cy="28" r="28" fill="#D0F5FD" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M28.026 16C25.0147 16 22.2713 16.9947 20.648 17.8073C20.5013 17.8807 20.3647 17.9527 20.2373 18.022C19.9853 18.1593 19.7707 18.2873 19.6 18.4L21.4467 21.1187L22.316 21.4647C25.7133 23.1787 30.2693 23.1787 33.6673 21.4647L34.654 20.9527L36.4 18.4C36.0384 18.164 35.6623 17.951 35.274 17.762C33.6587 16.958 30.9807 16 28.0267 16M23.732 19.0773C23.0781 18.955 22.4322 18.7929 21.798 18.592C23.3187 17.9167 25.5847 17.2 28.0267 17.2C29.718 17.2 31.3173 17.544 32.64 17.98C31.09 18.198 29.436 18.568 27.86 19.0233C26.62 19.382 25.1707 19.3433 23.732 19.0773ZM34.372 22.4533L34.208 22.536C30.4707 24.4213 25.5133 24.4213 21.776 22.536L21.6207 22.4573C16.0053 28.618 11.7187 39.998 28.026 39.998C44.3333 39.998 39.9427 28.4067 34.372 22.4533ZM27.3333 28C26.9797 28 26.6406 28.1405 26.3905 28.3905C26.1405 28.6406 26 28.9797 26 29.3333C26 29.687 26.1405 30.0261 26.3905 30.2761C26.6406 30.5262 26.9797 30.6667 27.3333 30.6667V28ZM28.6667 26.6667V26H27.3333V26.6667C26.6261 26.6667 25.9478 26.9476 25.4477 27.4477C24.9476 27.9478 24.6667 28.6261 24.6667 29.3333C24.6667 30.0406 24.9476 30.7189 25.4477 31.219C25.9478 31.719 26.6261 32 27.3333 32V34.6667C26.7533 34.6667 26.2593 34.2967 26.0753 33.778C26.048 33.6931 26.004 33.6146 25.9458 33.5471C25.8876 33.4795 25.8165 33.4244 25.7366 33.3848C25.6568 33.3452 25.5698 33.3221 25.4808 33.3167C25.3918 33.3113 25.3027 33.3239 25.2186 33.3536C25.1346 33.3833 25.0573 33.4295 24.9915 33.4896C24.9256 33.5497 24.8725 33.6223 24.8352 33.7033C24.7979 33.7843 24.7772 33.8719 24.7744 33.961C24.7715 34.0501 24.7866 34.1388 24.8187 34.222C25.0026 34.742 25.3431 35.1922 25.7935 35.5106C26.2438 35.829 26.7818 36 27.3333 36V36.6667H28.6667V36C29.3739 36 30.0522 35.719 30.5523 35.219C31.0524 34.7189 31.3333 34.0406 31.3333 33.3333C31.3333 32.6261 31.0524 31.9478 30.5523 31.4477C30.0522 30.9476 29.3739 30.6667 28.6667 30.6667V28C29.2467 28 29.7407 28.37 29.9247 28.8887C29.952 28.9735 29.996 29.052 30.0542 29.1196C30.1124 29.1871 30.1835 29.2423 30.2634 29.2819C30.3432 29.3215 30.4302 29.3446 30.5192 29.35C30.6082 29.3553 30.6973 29.3428 30.7814 29.3131C30.8654 29.2834 30.9427 29.2371 31.0085 29.1771C31.0744 29.117 31.1275 29.0443 31.1648 28.9634C31.2021 28.8824 31.2228 28.7948 31.2256 28.7057C31.2285 28.6166 31.2134 28.5278 31.1813 28.4447C30.9974 27.9247 30.6569 27.4745 30.2065 27.1561C29.7562 26.8377 29.2182 26.6667 28.6667 26.6667ZM28.6667 32V34.6667C29.0203 34.6667 29.3594 34.5262 29.6095 34.2761C29.8595 34.0261 30 33.687 30 33.3333C30 32.9797 29.8595 32.6406 29.6095 32.3905C29.3594 32.1405 29.0203 32 28.6667 32Z" fill="#0071BC" />
                    </svg>


                  </span>

                </div>
              </div>

              {/* <div class="max-w-full bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2">
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
              </div> */}

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
                    <select onChange={(e) => setBankCode(e?.target?.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-2 w-full">
                      <option selected disabled>Choose Bank</option>
                      <option value="044">Access Bank</option>
                      <option value="011">First Bank</option>
                      <option value="058">Guaranty Trust Bank (GTB)</option>
                      <option value="035">Wema Bank</option>
                      <option value="033">United Bank for Africa (UBA)</option>
                      <option value="560">Page MFBank</option>
                      <option value="304">Stanbic Mobile Money</option>
                      {/* <option value="308">FortisMobile</option> */}
                      <option value="050">Ecobank Plc</option>
                      <option value="307">EcoMobile</option>
                      <option value="309">FBNMobile</option>
                      <option value="326">Sterling Mobile</option>
                      {/* <option value="990">Omoluabi Mortgage Bank</option> */}
                      {/* <option value="311">ReadyCash (Parkway)</option> */}
                      <option value="057">Zenith Bank</option>
                      <option value="068">Standard Chartered Bank</option>
                      {/* <option value="301">JAIZ Bank</option> */}
                      <option value="070">Fidelity Bank</option>
                      {/* <option value="023">CitiBank</option> */}
                      <option value="215">Unity Bank</option>
                      <option value="323">Access Money</option>
                      <option value="318">Fidelity Mobile</option>
                      <option value="221">Stanbic IBTC Bank</option>
                      <option value="322">ZenithMobile</option>
                      <option value="063">Diamond Bank</option>
                      <option value="030">Heritage</option>
                      <option value="032">Union Bank</option>
                      <option value="232">Sterling Bank</option>
                      <option value="076">Skye Bank</option>
                      <option value="082">Keystone Bank</option>
                      <option value="327">Pagatech</option>
                      <option value="313">Mkudi</option>
                      <option value="214">First City Monument Bank</option>
                      <option value="315">GTMobile</option>
                    </select>
                  </div>

                  <div className="mb-6 ">
                    <label className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                      Enter Account Number
                    </label>
                    <input onChange={(e) => setAccountNumber(e?.target?.value)} type="number" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Account Number" style={{ backgroundColor: '#F5F5F5' }} />
                  </div>

                  <div className="mb-6 ">
                    <label className="flex justify-start  mb-2 pt-2 text-xs font-medium text-gray-600"
                    >
                      Amount You are About to witdraw?
                    </label>
                    <input type="number" onChange={(e) => setAmount(e?.target?.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="20000" style={{ backgroundColor: '#F5F5F5' }} />
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
