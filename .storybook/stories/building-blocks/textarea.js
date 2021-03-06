import React from 'react';

import { H1, H2, H3, H4 } from '../../../src/web/primitives/Heading';
import { P } from '../../../src/web/primitives/Paragraphs';
import { Table } from '../../../src/web/primitives/Table'
import * as common from './common';

export default function SchemaBuildingBlocks() {
  return (
    <div>
      <H1>Textarea</H1>
      <P>A multi-line input field.</P>

      <H2>Properties</H2>
      <Table>
        {common.thead}
        <tbody>
          <tr>
            <td><code>type</code></td>
            <td>
              The type is required in order to determine what type of node it is. For 
              a textarea, this property must be set to <code>Textarea</code>.
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><code>id</code></td>
            <td>The id of the textarea</td>
            <td>Yes</td>
          </tr>
          {common.inputProperties}
          <tr>
            <td><code>text</code></td>
            <td>The text to follow the heading for this input field.</td>
            <td></td>
          </tr>
          <tr>
            <td><code>information</code></td>
            <td>A notice that shows below the textarea.</td>
            <td></td>
          </tr>
          <tr>
            <td><code>validator</code></td>
            <td>
              Input validation. If a validator is provided, the following
              structure is expected:
              
              <pre>{`{
    pattern: '^\\d+(,\\d+)?$',
    error: 'Value should be on either one of these formats: 123 or 123,1239.'
  }`}</pre>
            </td>
            <td></td>
          </tr>
          {common.optional}
          {common.show}
          {common.hide}
        </tbody>
      </Table>
      <br/>
      
      <H2>Example</H2>
      <pre>{`{
  "id": "favourite.actor",
  "property": "favourite.actor",
  "type": "Input",
  "validator": {
    "pattern": "^\\d+(,\\d+)?$",
    "error": "Oppgi på formatet 123,1239"
  },
  "heading": "Hvem er din favorittskuespiller?",
  "text": "Input burde kanskje ikke ha brødtekst som skiller spørsmål fra inputfelt?",
  "placeholder": "Kit Harington"
}`}</pre>
    </div>
  );
}
