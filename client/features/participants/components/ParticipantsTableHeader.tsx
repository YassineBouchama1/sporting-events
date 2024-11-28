import { SortConfig, SortField } from '@/types/participant';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';


interface Props {
    sortConfig: SortConfig;
    handleSort: (field: SortField) => void;
}

const ParticipantsTableHeader = ({ sortConfig, handleSort }: Props) => {

  


    
    const getSortIcon = (field: SortField) => {
        if (sortConfig.field !== field) return <FaSort />;
        return sortConfig.order === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };




    return (
        <thead>
            <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                </th>
                <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                >
                    <div className="flex items-center gap-2">
                        Name
                        {getSortIcon('name')}
                    </div>
                </th>
                <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                >
                    <div className="flex items-center gap-2">
                        Email
                        {getSortIcon('email')}
                    </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default ParticipantsTableHeader;