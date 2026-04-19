import type { CardData } from '../../types'
import RevenueCard from '../cards/RevenueCard'
import AutoCard from '../cards/AutoCard'
import ApprovalCard from '../cards/ApprovalCard'
import CriticalCard from '../cards/CriticalCard'

interface Props {
  card: CardData
  isDragging?: boolean
}

export default function CardContainer({ card, isDragging }: Props) {
  const base = `transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`

  return (
    <div className={base}>
      {card.type === 'revenue'   && <RevenueCard card={card} />}
      {card.type === 'auto'      && <AutoCard card={card} />}
      {card.type === 'approval'  && <ApprovalCard card={card} />}
      {card.type === 'critical'  && <CriticalCard card={card} />}
    </div>
  )
}