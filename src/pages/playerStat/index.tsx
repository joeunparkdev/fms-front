import React from 'react';
import { Bar } from 'react-chartjs-2';
import './playerstat.css';

const dataForTotalGamesPlayed = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    data: [2, 3, 1, 3, 2, 3, 1],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
};
// const optionsForTotalGamesPlayed = {
//     scales: {
//       x: {
//         type: 'category',
//       },
//       y: {
//         beginAtZero: true,
//         type: 'linear',
//       },
//     },
//   } as const;
  
  

const PlayerStatistics = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">Total Players</div>
        <div className="card-body">22</div>
        <button>Add Player</button>
      </div>

      <div className="card">
        <div className="card-header">Team Size</div>
        <div className="card-body">14</div>
        <button>Add Members</button>
      </div>

      <div className="card">
        <div className="card-header">Total Games Played</div>
        {/* <Bar data={dataForTotalGamesPlayed} options={optionsForTotalGamesPlayed as any} /> */}
      </div>
    </div>
  );
};

export default PlayerStatistics;
