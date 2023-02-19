import { Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Hello world!</h1>
      </Suspense>
    </div>
  );
}
