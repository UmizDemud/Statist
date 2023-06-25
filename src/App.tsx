import { useState, useEffect } from 'react'
import './App.css'
import { matches } from './assets/data/match.ts';
import { teams } from './assets/data/team.ts';
import { Dropdown } from './components/Dropdown/Dropdown.tsx';
import { Keys } from './assets/data/keys.ts';
import { Match, Team } from './assets/data/types.ts';
import MatchRow from './components/MatchRow/MatchRow.tsx';

function App() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [team1Obj, setTeam1Obj] = useState<Team | null>(null);
  const [team2Obj, setTeam2Obj] = useState<Team | null>(null);

  const [selectedMatches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    'sa'
  }, [selectedMatches]);

  const search = () => {
    for (const team of teams) {
      if (team[Keys.Team.name] === team1) {
        setTeam1Obj(team);
      }

      if (team[Keys.Team.name] === team2) {
        setTeam2Obj(team);
      }
    }
    
    setMatches(() => {
      if (team1 !== '' && team2 !== '') {
        return matches.filter(match => {
          return match[Keys.Match.homeName] === team1 && match[Keys.Match.awayName] === team2
            || match[Keys.Match.homeName] === team2 && match[Keys.Match.awayName] === team1;
        });
      }
      
      if (team1 !== '') {
        return matches.filter(match => {
          return match[Keys.Match.homeName] === team1 || match[Keys.Match.awayName] === team1;
        });
      }
      
      if (team2 !== '') {
        return matches.filter(match => {
          return match[Keys.Match.homeName] === team2 || match[Keys.Match.awayName] === team2;
        });
      }

      return [];
    });
  }

  return (
    <div className='SearchPage'>
      <div className="nav">
        <div className="inputs">
          <div className="Input">
            <Dropdown
              words={teams.map(team => team[Keys.Team.name] as string)}
              placeholder="Takım 1"
              delay={400}
              save={(name: string) => {
                setTeam1(name);
              }}
            />
          </div>
          <div className="Input">
            <Dropdown
              words={teams.map(team => team[Keys.Team.name] as string)}
              placeholder="Takım 2"
              delay={400}
              save={(name: string) => {
                setTeam2(name);
              }}
            />
          </div>
        </div>
        <div>
          <button className='button' onClick={() => search()}>Ara</button>
        </div>
      </div>
      <div style={{width: '100%', padding: '1rem'}}>
        <div>
          {
            selectedMatches.length !== 0 ? (
              <div>
                <h3 style={{marginBottom: '1rem', paddingLeft: '1rem'}} >Maçlar</h3>
                {selectedMatches.sort((a, b) => (b[Keys.Match.ts] as number) - (a[Keys.Match.ts] as number)).map(item => (
                  <MatchRow key={`${item[Keys.Match.ts]}${Math.random()}`} match={item} />
                ))}
              </div>
            ) : (
              <></>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App
