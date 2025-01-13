// import { Team } from './enums';



// export class SequenceQueue {
//   private

//   constructor() {
//     this.sequences = [
//       { action: 'start' },
//       { action: 'pick', team: 'left', index: 0 },
//       { action: 'pick', team: 'right', index: 0 },
//       { action: 'ban', team: 'left', index: 0 },
//       { action: 'ban', team: 'right', index: 0 },
//       { action: 'pick', team: 'right', index: 1 },
//       { action: 'pick', team: 'right', index: 2 },
//       { action: 'pick', team: 'left', index: 1 },
//       { action: 'pick', team: 'left', index: 2 },
//       { action: 'pick', team: 'right', index: 3 },
//       { action: 'pick', team: 'right', index: 4 },
//       { action: 'pick', team: 'left', index: 3 },
//       { action: 'pick', team: 'left', index: 4 },
//       { action: 'votePick' },
//       { action: 'pick', team: 'left', index: 5 },
//       { action: 'pick', team: 'right', index: 5 },
//       { action: 'end' },
//     ];
//   }

//   get firstSequence() {
//     return this.sequences[0];
//   }

//   get secondSequence() {
//     return this.sequences[1];
//   }

//   enqueue(item: Sequence) {
//     this.sequences.push(item);
//   }

//   dequeue() {
//     return this.sequences.shift();
//   }

//   size() {
//     return this.sequences.length;
//   }
// }
