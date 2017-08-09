import React from 'react';
import Header from '../primitives/grid/Header';
import Logo from '../primitives/Logo';

export default function Heading() {
  return (<Header>
    <a href="/"><Logo /></a>
    <div>Veiviser: Hvor skal tittelen på veiviseren stå?</div>
  </Header>);
}
