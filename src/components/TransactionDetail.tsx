import type { Transaction } from '../types/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail = ({ transaction, onBack }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <button onClick={onBack} className="text-ios-blue text-2xl active:opacity-50 transition">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="text-center space-y-1 mt-4">
        <h1 className="text-[48px] font-bold tracking-tight">${transaction.amount}</h1>
        <p className="text-gray-500 font-medium">{transaction.name}</p>
        <p className="text-gray-400 text-sm">
          {new Date(transaction.date).toLocaleString('en-US')}
        </p>
      </div>

      <div className="mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <p className="font-bold">Status: {transaction.pending ? 'Pending' : 'Approved'}</p>
            <p className="text-gray-400 text-sm">{transaction.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Total</p>
            <p className="font-bold">${transaction.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;