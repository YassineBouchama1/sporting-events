
"use client";

const EventCardSkeleton = () => {
    return (
        <div className="relative group bg-gray-900 py-4 flex flex-col space-y-4 items-center rounded-md animate-pulse">

            <div className="w-20 h-20 rounded-full bg-gray-700" />


            <div className="h-8 w-3/4 bg-gray-700 rounded-md" />


            <div className="h-4 w-1/2 bg-gray-700 rounded-md" />


            <div className="absolute top-[-2px] flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-700 rounded-md" />
                <div className="w-4 h-4 bg-gray-700 rounded-full" />
            </div>


            <div className="flex justify-center gap-x-3 items-center w-full">
                <div className="h-10 w-24 bg-gray-700 rounded-md" />
                <div className="h-10 w-24 bg-gray-700 rounded-md" />
            </div>


            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-700 rounded-md" />
                <div className="h-4 w-24 bg-gray-700 rounded-md" />
            </div>
        </div>
    );
};

export default EventCardSkeleton;