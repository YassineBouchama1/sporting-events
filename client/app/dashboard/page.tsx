
import FormBtn from '@/features/events/components/FormBtn';
import ListEvents from '@/features/events/components/ListEvents';
import type { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
        return (
          <div className="flex-1 px-2 sm:px-0 h-full">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-extralight text-white/50">Apps 2</h3>
          
          </div>
          <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <FormBtn />
           <ListEvents/>
          </div>
        </div>
        );
}
export default page;