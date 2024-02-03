import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'

function Filters() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="px-2 py-6">
        <div className="flex flex-col justify-between md:flex-row">
          <p className="mb-4 text-2xl font-bold md:mb-0">Shoes</p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <button className="flex items-center justify-center text-sm font-semibold">
              Category
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="flex items-center justify-center text-sm font-semibold">
              Price
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="flex items-center justify-center text-sm font-semibold">
              Color
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="flex items-center justify-center text-sm font-semibold">
              Brand
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-gray-100 px-2 py-6 md:px-8">
        <div className="space-y-4 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <span className="font-semibold">Filters:</span>
            <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
              Nike <X className="ml-1 h-4 w-4 cursor-pointer" />
            </div>
            <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
              ₹20k - ₹100k <X className="ml-1 h-4 w-4 cursor-pointer" />
            </div>
          </div>
          <div className="">
            <button
              type="button"
              className="hidden rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:block"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="block w-full rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:hidden"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters;