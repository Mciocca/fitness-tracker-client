import { schema } from 'normalizr';

export const exercise = new schema.Entity('exercise');
export const workoutSet = new schema.Entity('workoutSet', { exercise });
export const workout = new schema.Entity('workout', {
  sets: [workoutSet],
});
