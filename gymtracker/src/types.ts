export type Category =
  | 'Brust' | 'Bizeps' | 'Rücken' | 'Beine' | 'Bauch' | 'Trizeps' | 'Schultern'

export interface CatalogExercise {
  id: string
  name: string
  category: Category
}

export interface WorkoutSet {
  reps: number
  weight: number
}

export interface WorkoutExercise {
  id: string            // exercise id from catalog
  name: string
  category: Category
  sets: WorkoutSet[]
}
