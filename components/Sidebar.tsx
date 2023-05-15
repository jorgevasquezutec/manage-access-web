'use client'
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbFaceId } from 'react-icons/tb'
import { signOut } from "next-auth/react"

const menuItems = [
  { id: 1, label: "Inicio", icon: MdOutlineSpaceDashboard, link: "/dashboard" },
  { id: 2, label: "Usuarios", icon: CgProfile, link: "/dashboard/users" },
  { id: 3, label: "Reconocimiento", icon: TbFaceId, link: "/dashboard/facial" },
];

const Sidebar = () => {
  
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-gray-200 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-grey-900 border-b border-gray-100 pb-4 w-full">
              Facial Admin
            </h1>
            {/* menu */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              {menuItems.map(({ icon: Icon, ...menu }) => {
                return (
                  <Link href={menu.link} key={menu.id}>
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <Icon className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        {menu.label}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* logout */}
            <div className="my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" onClick={() => signOut()}>
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default Sidebar;