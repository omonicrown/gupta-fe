import React from 'react'
import Navbar from '../Navbars/Navbar'
// import {
//     Accordion,
//     AccordionItem, 
//     AccordionItemHeading,
//     AccordionItemButton,
//     AccordionItemPanel,

// } from 'react-accessible-accordion';
// import 'react-accessible-accordion/dist/fancy-example.css';
import { SvgElement, icontypesEnum } from "../assets/svgElement";

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import CTA from './CTA';

  function Icon({ id, open }: { id: any; open: any }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }
function FAQ() {
    const [open, setOpen] = React.useState(1);
    const [openTestTab, setOpenTestTab] = React.useState(1);
    const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

    return (
        <>
            <Navbar />
            <div className='bg-[#FFFFFF] sm:px-16 px-6 flex justify-center items-start relative' >
                <div className='xl:max-w-[1280px] w-full'>
                    <div className='flex flex-col justify-center items-center sm:py-16 py-6'>
                        <h1 className='lg:text-[48px] text-[38px] font-bold text-center'>Frequently Asked Questions</h1>
                        <p className='mt-3 text-[#7B7B7B] lg:text-[16px] text-[14px]'>Need help? Check out the answers to your questions about Gupta</p>
                        <p className='mt-3 text-[#7B7B7B] lg:text-[16px] text-[14px]'>or send an email to <a href="mailto:hello@mygupta.co" className='text-[#0071BC] '>hello@mygupta.co</a></p>
                    </div>

                    <div className='flex-col justify-center items-center'>



                        <>
                            <div className='lg:mx-[227px] pb-20 mt-10'>
                                <div className='bg-[#F2F2F2] py-5 pl-4 mb-10 rounded-[8px]'>
                                    <div className='flex space-x-8'>
                                        <h3
                                            onClick={() => setOpenTestTab(1)}
                                            className={` ${openTestTab === 1 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>General</h3>
                                        <h3 onClick={() => setOpenTestTab(2)}
                                            className={` ${openTestTab === 2 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Whatsapp Link</h3>
                                        <h3 onClick={() => setOpenTestTab(3)}
                                            className={` ${openTestTab === 3 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Multi Link</h3>
                                        <h3 onClick={() => setOpenTestTab(4)}
                                            className={` ${openTestTab === 4 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Mini Store</h3>
                                        <h3 onClick={() => setOpenTestTab(5)}
                                            className={` ${openTestTab === 5 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Payment</h3>
                                        <h3 onClick={() => setOpenTestTab(6)}
                                            className={` ${openTestTab === 6 ? "text-[#0071BC] " : "text-black"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>QR Code</h3>
                                    </div>
                                </div>
                                <div className={openTestTab === 1 ? "block" : "hidden"}>
                                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />} >
                                        <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(2)}>
                                            How to use Material Tailwind?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(3)}>
                                            What can I do with Material Tailwind?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                </div>
                                <div className={openTestTab === 2 ? "block" : "hidden"}>
                                    <Accordion open={open === 4} icon={<Icon id={4} open={open} />} >
                                        <AccordionHeader onClick={() => handleOpen(4)}>What is gupta Tailwind?</AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(5)}>
                                            How to use Material Tailwind?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(6)}>
                                            What can I do with Material Tailwind?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                            growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                            ourselves and actualize our dreams.
                                        </AccordionBody>
                                    </Accordion>
                                </div>

                            </div>

                        </>

                    </div>

                    <div>
                        <CTA />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQ