import type { Transaction } from '../types/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';

interface Props {
  transactions: Transaction[];
  dailyPoints: string;
  onSelect: (id: string) => void;
}

const TransactionsList = ({ transactions, dailyPoints, onSelect }: Props) => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex gap-3 items-stretch">
        <div className="flex flex-col gap-3 w-1/2">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-[13px] font-medium text-gray-500">Card Balance</p>
            <p className="text-3xl font-bold">$17.30</p>
            <p className="text-[11px] text-gray-400 mt-1">$1,482.70 Available</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-[13px] font-medium text-gray-500">Daily Points</p>
            <p className="text-xl font-bold text-gray-400">{dailyPoints}</p>
          </div>
        </div>

        <div className="w-1/2 bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[15px] font-semibold">No Payment Due</p>
            <p className="text-[12px] text-gray-500 mt-1">You've paid your September balance.</p>
          </div>
          <div className="flex justify-end">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3 px-1">Latest Transactions</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {transactions.slice(0, 10).map((t) => (
            <div 
              key={t.id}
              onClick={() => onSelect(t.id)}
              className="group flex items-center justify-between p-4 border-b border-gray-100 last:border-0 cursor-pointer active:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl
                  ${t.name === 'IKEA' ? 'bg-[#0051ba]' : t.type === 'Payment' ? 'bg-gradient-to-tr from-orange-400 to-purple-600' : 'bg-black'}`}>
                  <FontAwesomeIcon icon={t.name === 'IKEA' ? faChevronRight : faApple} />
                </div>
                
                <div>
                  <p className="text-[15px] font-semibold">{t.name}</p>
                  <p className="text-[12px] text-gray-500">
                    {t.pending && <span className="font-bold">Pending - </span>}
                    {t.description}
                  </p>
                  <p className="text-[12px] text-gray-400">
                    {t.authorizedUser && `${t.authorizedUser} — `}
                    {new Date(t.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[15px] font-semibold">
                    {t.type === 'Payment' ? `+${t.amount}` : t.amount}
                  </p>
                  {t.type === 'Credit' && <span className="text-[10px] bg-gray-100 px-1 rounded font-bold text-gray-500">3%</span>}
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-300 text-xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;