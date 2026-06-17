/* === Initial Data (초기 리워드 데이터) === */
export const INITIAL_REWARDS = [
  {
    id: 'bamboo',
    name: 'Bamboo Stand',
    minPledge: 25,
    description: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
    quantity: 101,
  },
  {
    id: 'black_edition',
    name: 'Black Edition Stand',
    minPledge: 75,
    description: "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
    quantity: 64,
  },
  {
    id: 'mahogany',
    name: 'Mahogany Special Edition',
    minPledge: 200,
    description: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
    quantity: 0,
  },
];
// id는 PledgeModal의 pledgeValues 키와 반드시 일치해야 함
