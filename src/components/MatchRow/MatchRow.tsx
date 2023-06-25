import { Match } from '../../../public/data/types'
import { Keys } from '../../../public/data/keys'
import moment from 'moment';
import './index.css'

type MatchRowProps = {
    match: Match
}

function MatchRow(props: MatchRowProps) {
    const {match} = props;
  return (
    <div className='MatchRow' style={{display: 'flex', justifyContent: 'space-between', width: '660px'}}>
        <p style={{width: '200px', textDecoration: match[Keys.Match.winner] === 1 ? 'underline' : 'none'}}>
            {match[Keys.Match.homeName]}
        </p>
        <p style={{width: '20px'}}>
            {match[Keys.Match.g_h]}
        </p>
        <p style={{width: '20px'}}> - </p>
        <p style={{width: '20px'}}>
            {match[Keys.Match.g_a]}
        </p>
        <p style={{width: '200px', textDecoration: match[Keys.Match.winner] === -1 ? 'underline' : 'none'}}>
            {match[Keys.Match.awayName]}
        </p>
        <p style={{width: '70px'}}>
            {moment.unix(match[Keys.Match.ts] as number).format('HH:MM')}
        </p>
        <p style={{width: '130px'}}>
            {moment.unix(match[Keys.Match.ts] as number).format('DD.MM.YYYY')}
        </p>
        
    </div>
  )
}

export default MatchRow