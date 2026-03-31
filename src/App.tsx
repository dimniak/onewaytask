import { useState, useEffect } from 'react'
import transactionsData from './data/transactions.json'
import type { Transaction } from './types/index'
import { calculateDailyPoints } from './utils/points'

// My components
import TransactionsList from './components/TransactionsList'
import TransactionDetail from './components/TransactionDetail'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dailyPoints, setDailyPoints] = useState('')

  useEffect(() => {
    // load data from api
    setTransactions(transactionsData as Transaction[])
    // calulate daily points
    setDailyPoints(calculateDailyPoints(new Date()))
  }, [])

  const selectedTransaction = transactions.find(t => t.id === selectedId)

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[390px] bg-ios-bg min-h-screen shadow-lg">
        {selectedTransaction ? (
          <TransactionDetail 
            transaction={selectedTransaction} 
            onBack={() => setSelectedId(null)} 
          />
        ) : (
          <TransactionsList 
            transactions={transactions} 
            dailyPoints={dailyPoints}
            onSelect={(id) => setSelectedId(id)} 
          />
        )}
      </div>
    </div>
  )
}

export default App