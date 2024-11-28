
import React from 'react'

import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'


export default function HeroLanding() {


  return (
    <section className="pt-24 bg-gray-900 h-screen">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
            <span>Start</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-[#715ab3] to-[#3749A6] lg:inline">
              Your Dream Evenet!
            </span>{" "}
            <span>Now.</span>
          </h1>
          <p className="px-0 mb-8 text-lg text-white md:text-xl lg:px-24">
            This is dashboard help u to create events and manage it Easy
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 flex items-center justify-center">
            <Link
              href={"/auth"}

              className="inline-flex items-center justify-center w-full px-6 py-3  gap-x-3 text-lg bg-[#715ab3] hover:bg-[#715ab3]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium  text-white rounded-2xl sm:w-auto sm:mb-0"

            >
              <FiLogIn />
              <p>Start Now</p>
              <div />
            </Link>

          </div>
        </div>

      </div>
    </section >

  )
}