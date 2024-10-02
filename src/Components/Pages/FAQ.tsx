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
import Footer from './Footer';

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
            <div className='bg-[#FFFFFF] sm:px-16 mt-14 px-6 flex justify-center items-start relative' >
                <div className='xl:max-w-[1280px] w-full'>
                    <div className='flex flex-col justify-center items-center sm:py-16 py-6'>
                        <h1 className='lg:text-[48px] text-[38px] font-bold text-center'>Frequently Asked Questions</h1>
                        <p className='mt-3 text-[#7B7B7B] lg:text-[16px] text-[14px]'>Need help? Check out the answers to your questions about Gupta</p>
                        <p className='mt-3 text-[#7B7B7B] lg:text-[16px] text-[14px]'>or send an email to <a href="mailto:hello@mygupta.co" className='text-[#0071BC] '>hello@mygupta.co</a></p>
                    </div>

                    <div className='flex-col justify-center items-center'>



                        <>
                            <div className='lg:mx-[227px] pb-20 mt-10'>
                                <div className='bg-[#0071BC] py-5 pl-4 mb-10 rounded-[8px]'>
                                    <div className='flex space-x-8'>
                                        <h3
                                            onClick={() => setOpenTestTab(1)}
                                            className={` ${openTestTab === 1 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>General</h3>
                                        {/* <h3 onClick={() => setOpenTestTab(2)}
                                            className={` ${openTestTab === 2 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Whatsapp Link</h3>
                                        <h3 onClick={() => setOpenTestTab(3)}
                                            className={` ${openTestTab === 3 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Multi Link</h3>
                                        <h3 onClick={() => setOpenTestTab(4)}
                                            className={` ${openTestTab === 4 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Mini Store</h3> */}
                                        <h3 onClick={() => setOpenTestTab(5)}
                                            className={` ${openTestTab === 5 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>Payment</h3>
                                        <h3 onClick={() => setOpenTestTab(6)}
                                            className={` ${openTestTab === 6 ? "text-[#0071BC] bg-white rounded-[20px] px-5 py-1.5" : "text-white"} lg:text-[16px] text-[14px] font-medium cursor-pointer`}>QR Code</h3>
                                    </div>
                                </div>
                                <div className={openTestTab === 1 ? "block" : "hidden"}>
                                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />} >
                                        <AccordionHeader onClick={() => handleOpen(1)}>What is Gupta?</AccordionHeader>
                                        <AccordionBody>
                                            Gupta is your all-in-one tool to help you boost your business. It lets you create personalized
                                            links, mini websites, track your sales, and even collect payments easily.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(2)}>
                                            How can Gupta help my business?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Gupta makes it super easy to create custom links for WhatsApp, design your own mini website,
                                            and track everything with cool analytics. Plus, you can collect payments directly from your
                                            product pages. It's like having a business assistant right on your phone!
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(3)}>
                                            What are customized links?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Customized links are special URLs you can create with Gupta. They’re perfect for sharing your
                                            products or services on WhatsApp or other places. Think of them like personalized invitations to
                                            your shop.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(4)}>
                                            Can I really track my sales and customer activity?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Absolutely! Gupta gives you all the details you need. You can see who’s clicking your links, what
                                            they’re looking at, and how your sales are doing – all in one place.

                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(5)}>
                                            What is the Gupta Marketplace?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            The Gupta Marketplace is a new feature we’re launching soon. It’s like a big online shop where
                                            all vendors can list their products. Customers can browse and buy from different vendors all in
                                            one place.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(6)}>
                                            Do I need any technical skills to use Gupta?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Nope! Gupta is designed to be super user-friendly. If you can use a smartphone, you can use
                                            Gupta. And if you ever get stuck, we’re here to help!
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(7)}>
                                            Is there a cost to use Gupta?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            You can start with a free trial to check out all the features. After that, there are different
                                            subscription plans you can choose from, depending on what you need.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(8)}>
                                            What’s this about a monthly cash prize?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Oh, yes! Each month, we give a cash prize to the most active vendor on Gupta. It’s our way of
                                            saying thank you for being awesome and using Gupta to its full potential.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 9} icon={<Icon id={9} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(9)}>
                                            How can I get support if I have questions?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            We’re always here for you! You can reach out to us via WhatsApp, email, or join our Telegram
                                            channel. We’ll help you with anything you need.
                                        </AccordionBody>
                                    </Accordion>
                                    <Accordion open={open === 10} icon={<Icon id={10} open={open} />}>
                                        <AccordionHeader onClick={() => handleOpen(10)}>
                                            Can I really get extra help setting things up?
                                        </AccordionHeader>
                                        <AccordionBody>
                                            Yes, you can! If you need a hand setting up your links, website, or anything else, just let us
                                            know. We’re happy to go the extra mile for you.
                                        </AccordionBody>
                                    </Accordion>
                                </div>

                                {/* <-- Whatsapp Link --> */}
                                {/* <div className={openTestTab === 2 ? "block" : "hidden"}>
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
                                </div> */}


                                {/* <div className={openTestTab === 3 ? "block" : "hidden"}>
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
                                </div> */}

                            </div>

                        </>

                    </div>




                </div>
            </div>
            {/* Start Section */}
            <div className='bg-[#0071BC] sm:px-16 px-6 flex justify-center items-start ' >
                <div className='xl:max-w-[1200px] w-full'>
                    <CTA />
                </div>
            </div>
            {/* End Section */}
            <div>
                <Footer />
            </div>
        </>
    )
}

export default FAQ