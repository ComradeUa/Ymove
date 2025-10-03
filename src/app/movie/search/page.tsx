import MoviesSearchResults from '@/components/MovieSearchResults';
import { Suspense } from 'react';
export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MoviesSearchResults />
    </Suspense>
  );
}
