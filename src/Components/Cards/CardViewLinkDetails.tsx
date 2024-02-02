
import React, { useState } from "react";
import { AdminApis } from "../../apis/adminApi";
import { NavLink } from "react-router-dom";
import { SvgElement, icontypesEnum } from "../assets/svgElement";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';
import { useParams } from 'react-router-dom';
import configs from "../../configs";
import { FaTrash, FaEdit } from "react-icons/fa";
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//@ts-ignore
import faker from 'faker';
import QRCode from "react-qr-code";

// components

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Click History',
    },
  },
};


export default function CardViewLinkDetails() {



  const [chartData, setChartData] = React.useState([]);
  const [totalClicks, setTotalClicks] = React.useState([]);
  const maxNumber = 69;

  const params = useParams();

  const currentDate = new Date('2023-08-26T13:13:08.000000Z');

  // console.log(currentDate.getFullYear());

  function ConvertMonth(value: any) {
    if (value == '0') { return "Jan" }
    else if (value == '1') { return "Feb" }
    else if (value == '2') { return "Mar" }
    else if (value == '3') { return "Apr" }
    else if (value == '4') { return "May" }
    else if (value == '5') { return "Jun" }
    else if (value == '6') { return "Jul" }
    else if (value == '7') { return "Aug" }
    else if (value == '8') { return "Sep" }
    else if (value == '9') { return "Oct" }
    else if (value == '10') { return "Nov" }
    else if (value == '11') { return "Dec" }
  }

  const handleCaptureClick = React.useCallback(async () => {
    const pricingTableElmt =
      document.querySelector('#container') as HTMLElement;
    // if (!pricingTableElmt) return;
    const canvas = await html2canvas(pricingTableElmt);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  }, []);



  // console?.log(params?.id)

  const [chrome, setChrome] = React.useState<any>('0');
  const [android, setAndroid] = React.useState<any>('0');
  const [ios, setIos] = React.useState<any>('0');
  const [macBook, setMacBook] = React.useState<any>('0');
  const [safari, setSafari] = React.useState<any>('0');
  const [dates, setDates] = React.useState<any>([]);
  const [linkData, setLinkData] = React.useState<any>([]);

  React.useEffect(() => {
    AdminApis.getlinksDetails(params?.id).then(
      (response: any) => {
        if (response?.data) {
          console?.log(response?.data?.link)
          setLinkData(response?.data?.link)
          setTotalClicks((response?.data?.link?.social_traffic?.map((year: any) => year?.visit)))
          setSafari((response?.data?.link?.social_traffic?.map((year: any) => year?.safari)))
          setChrome((response?.data?.link?.social_traffic?.map((year: any) => year?.chrome)))
          setIos((response?.data?.link?.social_traffic?.map((year: any) => year?.iphone)))
          setMacBook((response?.data?.link?.social_traffic?.map((year: any) => year?.macbook)))
          setAndroid((response?.data?.link?.social_traffic?.map((year: any) => year?.android)))

          setDates(response?.data?.link?.graph?.map((year: any) => year?.month_day))
          setChartData(response?.data?.link?.graph?.map((year: any) => year?.total_click))
        }
      }
    );
  }, []);



  const labels = dates;

  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: chartData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };






  return (
    <>
      <div className=" bg-white w-full mb-6  rounded">
        <div className=" mb-0 py-1 border-0 lg:flex md:gap-2">
          <div className="lg:w-4/12  px-2 md:border-r-2 lg:min-h-[70vh] md:min-h-[50vh] ">

            <div className="flex flex-col bg-[#0071BC] text-white md:w-12/12 rounded-lg p-4 mt-3 mr-2">
              <span className="flex justify-center text-[14px]">Total Clicks</span>
              <span className="flex justify-center text-[48px] font-bold">{totalClicks}</span>
            </div>
            <div className="flex justify-between mt-10">
              <div className="flex flex-col">
                <span className=" text-[20px] font-bold">link.mygupta.co/{linkData?.link_data?.name}</span>
                <span className=" text-[12px] font-normal mt-2">{linkData?.link_info?.phone_number}</span>
              </div>
              <span className="mt-3"><SvgElement type={icontypesEnum.EDITPEN} /></span>
            </div>

            <p className=" bg-[#F4FBFF] min-h-[10vh] text-[#A9A9A9] text-[15px] p-1 px-2 mt-[14px]">
              {linkData?.link_info?.message}
            </p>

            {/* <div className="flex justify-start gap-2 mt-3">
              
              <SvgElement type={icontypesEnum.COPY} />
              <SvgElement type={icontypesEnum.UPARROW} />
              <SvgElement type={icontypesEnum.DELETE} />
            </div> */}
            <div className="mt-4">
              <span className="text-[14px] font-bold"> Status :</span>
              <span className="border border-green-600 rounded-md text-[12px] p-1 ml-2">Active</span>
            </div>

            {/* <div className="mt-4">
              <span className="text-[14px] font-bold"> Created :</span>
              <span className="text-[12px] p-1 ml-1">{linkData?.short_url_data?.created_at}</span>
            </div>

            <div className="mt-4">
              <span className="text-[15px] font-bold p-1 ml-1 flex justify-start gap-1 text-red-600 cursor-pointer">
                <span className="mt-1"><FaTrash /> </span>
                <span>Delete Link</span>
              </span>
            </div> */}

            <span className="flex justify-start mt-4">
              <button
                type="submit"
                onClick={handleCaptureClick}
                style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                className=" text-white inline-flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 py-0.5 text-center "
              >
                <span className="mt-2">Download</span>  <SvgElement type={icontypesEnum.QRCODE} />
              </button>
            </span>

            <span id="container">
              <label
                className="flex justify-start mb-8 pt-4 text-xs font-xs text-gray-600"
                style={{ fontSize: '14px' }}
              >
                Your WhatsApp QR Code
              </label>

              <QRCode
                size={226}
                value={(linkData?.link_data?.name) ? `link.mygupta.co/${linkData?.link_data?.name}` : "empty"}
                viewBox={`0 0 256 256`}
              />

              {/* <span className=" text-white"> _</span> */}
            </span>







          </div>

          <div className="lg:w-8/12">


            <div className="md:grid md:grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg mt-3 min-h-[25vh]">
                <div className="p-3">
                  <span className="text-[16px] font-bold">Traffic By country</span>
                  <span >
                    <SvgElement type={icontypesEnum.MAP} />
                  </span>

                </div>
              </div>

              <div className="border border-gray-200 rounded-lg  mt-3 min-h-[25vh]">
                <div className="px-7 py-4">
                  <span className="text-[16px] font-bold flex justify-center">Social traffic</span>

                  <div className="flex justify-between">
                    <span className="text-[15px]"> Android Users</span>
                    <span className="font-bold">{android} Clicks</span>
                  </div>

                  <div className="flex justify-between pt-3">
                    <span className="text-[15px]">IOS Users</span>
                    <span className="font-bold">{parseInt(ios) + parseInt(macBook)} Clicks</span>
                  </div>

                  {/* <div className="flex justify-between pt-3">
                    <span className="text-[15px]">MacBook Users</span>
                    <span className="font-bold">{macBook} Clicks</span>
                  </div> */}

                  {/* <div className="flex justify-between">
                    <span>Chrom 1</span>
                    <span>20</span>
                  </div> */}

                </div>

                <hr />

                <div className="px-7 py-4">
                  <span className="text-[16px] font-bold flex justify-center">Browsers</span>

                  <div className="flex justify-between">
                    <span className="text-[15px]"> Chrome</span>
                    <span className="font-bold">{chrome} Clicks</span>
                  </div>

                  <div className="flex justify-between pt-3">
                    <span className="text-[15px]">Safari</span>
                    <span className="font-bold">{safari} Clicks</span>
                  </div>

                  {/* <div className="flex justify-between">
                    <span>Chrom 1</span>
                    <span>20</span>
                  </div> */}

                </div>
              </div>

            </div>

            <div className="border border-gray-200 rounded-lg  mt-3 min-h-[30vh]">
              <div className="p-3">
                <span className="text-[16px] font-bold">Overview</span>

                <Line options={options} data={data} />
              </div>
            </div>

          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

        </div>
      </div>

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
