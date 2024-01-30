// formations.ts
export interface Position {
    x: string;
    y: string;
  }
  
  export interface Formation {
    defenders: Position[];
    midfielders: Position[];
    attackers: Position[];
    goalkeeper: Position;
    positionNames: {
      defenders: string[];
      midfielders: string[];
      attackers: string[];
      goalkeeper: string;
    };
  }
  
  const formations: { [key: string]: Formation } = {
    '3-4-3': {
        attackers: [
          { x: '10%', y: '15%' }, // LW
          { x: '40%', y: '15%' }, // CF
          { x: '70%', y: '15%' }, // RW
        ],
        midfielders: [
          { x: '0%', y: '40%' }, // LM
          { x: '27%', y: '40%' }, // CM
          { x: '53%', y: '40%' }, // CM
          { x: '80%', y: '40%' }, // RM
        ],
        defenders: [
          { x: '10%', y: '65%' }, // CB
          { x: '40%', y: '65%' }, // CB
          { x: '70%', y: '65%' }, // CB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LCB', 'CB', 'RCB'],
          midfielders: ['LM', 'LCM', 'RCM', 'RM'],
          attackers: ['LF', 'ST', 'RF'],
          goalkeeper: 'GK',
        }
      },
      '3-4-1-2': {
        attackers: [
          { x: '20%', y: '10%' }, // CF
          { x: '60%', y: '10%' }, // CF
        ],
        midfielders: [
          { x: '0%', y: '45%' }, // LM
          { x: '27%', y: '45%' }, // CM
          { x: '40%', y: '25%' }, // AM (공격적 미드필더)
          { x: '53%', y: '45%' }, // CM
          { x: '80%', y: '45%' }, // RM
        ],
        defenders: [
          { x: '10%', y: '65%' }, // CB
          { x: '40%', y: '65%' }, // CB
          { x: '70%', y: '65%' }, // CB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LCB', 'CB', 'RCB'],
          midfielders: ['LM', 'LCM', 'CAM', 'RCM', 'RM'],
          attackers: ['LS', 'RS'],
          goalkeeper: 'GK'
        }
      },
      '4-1-4-1': {
        attackers: [
          { x: '40%', y: '10%' }, // CF
        ],
        midfielders: [
          { x: '0%', y: '30%' }, // LM
          { x: '25%', y: '30%' }, // CM
          { x: '55%', y: '30%' }, // CM
          { x: '80%', y: '30%' }, // RM
          { x: '40%', y: '47%' }, // CDM
        ],
        defenders: [
          { x: '0%', y: '65%' }, // LB
          { x: '25%', y: '65%' }, // CB
          { x: '55%', y: '65%' }, // CB
          { x: '80%', y: '65%' }, // RB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LB', 'LCB', 'RCB', 'RB'],
          midfielders: ['LM', 'LCM', 'CDM', 'RCM', 'RM'],
          attackers: ['ST'],
          goalkeeper: 'GK'
        }
      },
      '4-2-3-1': {
        attackers: [
          { x: '40%', y: '10%' }, // CF
        ],
        midfielders: [
          { x: '10%', y: '30%' }, // LM
          { x: '40%', y: '30%' }, // CM
          { x: '70%', y: '30%' }, // RM
          { x: '20%', y: '50%' }, // CDM
          { x: '60%', y: '50%' }, // CDM
        ],
        defenders: [
          { x: '-5%', y: '70%' }, // LB
          { x: '25%', y: '70%' }, // CB
          { x: '55%', y: '70%' }, // CB
          { x: '85%', y: '70%' }, // RB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LB', 'LCB', 'RCB', 'RB'],
          midfielders: ['LDM', 'RDM', 'CAM', 'LAM', 'RAM'],
          attackers: ['ST'],
          goalkeeper: 'GK'
        }
      },
      '4-2-4': {
        attackers: [
            { x: '0%', y: '15%' }, // LW
            { x: '25%', y: '15%' }, // CF
            { x: '55%', y: '15%' }, // CF
            { x: '80%', y: '15%' }, // RW
          ],
        midfielders: [
            { x: '20%', y: '40%' }, // CM
            { x: '60%', y: '40%' }, // CM
          ],
        defenders: [
            { x: '0%', y: '65%' }, // CB
            { x: '25%', y: '65%' }, // CB
            { x: '55%', y: '65%' }, // LB
            { x: '80%', y: '65%' }, // RB
          ],
          goalkeeper: { x: '40%', y: '85%' }, // GK
          positionNames: {
            defenders: ['LB', 'LCB', 'RCB', 'RB'],
            midfielders: ['LCM', 'RCM'],
            attackers: ['LW', 'LS', 'RS', 'RW'],
            goalkeeper: 'GK'
          }
    },
    '4-3-3': {
        attackers: [
            { x: '10%', y: '15%' }, // LW
            { x: '40%', y: '15%' }, // CF
            { x: '70%', y: '15%' }, // RW
          ],
        midfielders: [
            { x: '15%', y: '40%' }, // CM
            { x: '40%', y: '40%' }, // CM
            { x: '65%', y: '40%' }, // CM
          ],
        defenders: [
            { x: '0%', y: '65%' }, // LB
            { x: '27%', y: '65%' }, // CB
            { x: '53%', y: '65%' }, // CB
            { x: '80%', y: '65%' }, // RB
          ],
          goalkeeper: { x: '40%', y: '85%' }, // GK
          positionNames: {
            defenders: ['LB', 'LCB', 'RCB', 'RB'],
            midfielders: ['LCM', 'CM', 'RCM'],
            attackers: ['LW', 'ST', 'RW'],
            goalkeeper: 'GK'
          }
          
    },
    '4-4-1-1': {
        attackers: [
          { x: '40%', y: '25%' }, // Second Striker
          { x: '40%', y: '5%' }, // CF
        ],
        midfielders: [
        { x: '0%', y: '45%' }, // LM
        { x: '27%', y: '45%' }, // CM
        { x: '53%', y: '45%' }, // CM
        { x: '80%', y: '45%' }, // RM
        ],
        defenders: [
        { x: '0%', y: '65%' }, // LB
        { x: '25%', y: '65%' }, // CB
        { x: '55%', y: '65%' }, // CB
        { x: '80%', y: '65%' }, // RB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LB', 'LCB', 'RCB', 'RB'],
          midfielders: ['LM', 'LCM', 'RCM', 'RM'],
          attackers: ['CAM','ST'],
          goalkeeper: 'GK'
        }
        
      },
      '4-4-2': {
        attackers: [
          { x: '20%', y: '10%' }, // CF
          { x: '60%', y: '10%' }, // CF
        ],
        midfielders: [
          { x: '0%', y: '35%' }, // LM
          { x: '25%', y: '35%' }, // CM
          { x: '55%', y: '35%' }, // CM
          { x: '80%', y: '35%' }, // RM
        ],
        defenders: [
          { x: '0%', y: '60%' }, // LB
          { x: '25%', y: '60%' }, // CB
          { x: '55%', y: '60%' }, // CB
          { x: '80%', y: '60%' }, // RB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LB', 'LCB', 'RCB', 'RB'],
          midfielders: ['LM', 'LCM', 'RCM', 'RM'],
          attackers: ['ST', 'CF'],
          goalkeeper: 'GK'
        }
        
      },
    '4-5-1': {
        attackers: [
        { x: '40%', y: '10%' }, // CF
        ],
        midfielders: [
        { x: '-5%', y: '35%' }, // LM
        { x: '15%', y: '40%' }, // CM
        { x: '40%', y: '38%' }, // CM
        { x: '65%', y: '40%' }, // CM
        { x: '85%', y: '35%' }, // RM
        ],
        defenders: [

        { x: '0%', y: '65%' }, // LB
        { x: '25%', y: '65%' }, // CB
        { x: '55%', y: '65%' }, // CB
        { x: '80%', y: '65%' }, // RB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LB', 'LCB', 'RCB', 'RB'],
          midfielders: ['LM', 'LCM', 'CM', 'RCM', 'RM'],
          attackers: ['ST'],
          goalkeeper: 'GK',
        }
    },
    '5-3-2': {
        attackers: [
        { x: '20%', y: '15%' }, // CF
        { x: '60%', y: '15%' }, // CF
        ],
        midfielders: [
            { x: '10%', y: '35%' }, // CM
            { x: '40%', y: '35%' }, // CM
            { x: '70%', y: '35%' }, // CM
        ],
        defenders: [
        { x: '-5%', y: '57%' },  // LWB
        { x: '15%', y: '65%' }, // CB
        { x: '40%', y: '63%' }, // CB
        { x: '65%', y: '65%' }, // CB
        { x: '85%', y: '57%' }, // RWB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LWB', 'LCB', 'CB', 'RCB', 'RWB'],
          midfielders: ['LCM', 'CM', 'RCM'],
          attackers: ['LS', 'RS'],
          goalkeeper: 'GK',
        }
        
    },
    '5-4-1': {
        attackers: [
        { x: '40%', y: '10%' }, // CF
        ],
        midfielders: [
        { x: '0%', y: '35%' }, // LM
        { x: '27%', y: '35%' }, // CM
        { x: '53%', y: '35%' }, // CM
        { x: '80%', y: '35%' }, // RM
        ],
        defenders: [
            { x: '-5%', y: '57%' },  // LWB
            { x: '15%', y: '65%' }, // CB
            { x: '40%', y: '63%' }, // CB
            { x: '65%', y: '65%' }, // CB
            { x: '85%', y: '57%' }, // RWB
        ],
        goalkeeper: { x: '40%', y: '85%' }, // GK
        positionNames: {
          defenders: ['LWB', 'LCB', 'CB', 'RCB', 'RWB'],
          midfielders: ['LM', 'LCM', 'RCM', 'RM'],
          attackers: ['ST'],
          goalkeeper: 'GK',
        }
        
    },
  };
  
  export default formations;
  