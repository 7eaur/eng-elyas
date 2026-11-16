import { useEffect } from 'react';
import page from './home.html?raw';
export function App(){
  useEffect(()=>{ import('./experience.js'); import('./sections.js'); },[]);
  return <div dangerouslySetInnerHTML={{__html:page}}/>;
}
