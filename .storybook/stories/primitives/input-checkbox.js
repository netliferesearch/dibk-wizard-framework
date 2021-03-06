import React from 'react';
import { H1, H2, H3 } from '../../../src/web/primitives/Heading';
import { Checkbox, TextInput, Textarea, NumberInput, SelectWrapper } from '../../../src/web/primitives/Input';
import { Label } from '../../../src/web/primitives/Label';
import SoftWarning from '../../../src/web/primitives/SoftWarning';
import Fieldset from '../../../src/web//primitives/Fieldset';
import Legend from '../../../src/web//primitives/Legend';

export default function PrimitivesIntro() {
  return (<div>
    <H1>Checkbox inputs</H1>
    <H2>Regular</H2>
    <div>
        <Checkbox type="checkbox" id="checkbox1" />
        <Label for="checkbox1">
              <div>
                An option
              </div>
        </Label>
    </div>
    <div>
        <Checkbox type="checkbox" id="checkbox1" />
        <Label for="checkbox1">
              <div>
                Another option
              </div>
        </Label>
    </div>
    <div>
        <Checkbox type="checkbox" id="checkbox1" checked />
        <Label for="checkbox1">
              <div>
                A checked option
              </div>
        </Label>
    </div>
    <div>
        <Checkbox type="checkbox" id="checkbox1" disabled />
        <Label for="checkbox1">
              <div>
                A disabled option
              </div>
        </Label>
    </div>
    <hr />
    <H2>With images</H2>
    <div>
    <Checkbox type="checkbox" id="checkbox1" />
    <Label for="checkbox1">
        <div>
          <div>
            <H3>Heading</H3>
          </div>

          <div>
            Eos vero scripta id, vix labitur persecuti eloquentiam ei. Te justo dictas labitur eam. Omnium prompta placerat in sed.
          </div>
        </div>
        <img src="https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg" alt="alt" />
      </Label>
    </div>
    <hr />
    <H2>With messages</H2>
    <div>
    <Checkbox type="checkbox" id="checkbox1" />
    <Label for="checkbox1" warning>
        <div>
          <div>
            <H3>Heading</H3>
              <SoftWarning warning>
                An important sad message regarding this field
              </SoftWarning>
          </div>

          <div>
            Eos vero scripta id, vix labitur persecuti eloquentiam ei. Te justo dictas labitur eam. Omnium prompta placerat in sed.
          </div>
        </div>
        <img src="https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg" alt="alt" />
      </Label>
    </div>
    <div>
    <Checkbox type="checkbox" id="checkbox2" />
    <Label for="checkbox2">
        <div>
          <div>
            <H3>Heading</H3>
              <SoftWarning>
                An important happy message regarding this field
              </SoftWarning>
          </div>

          <div>
            Eos vero scripta id, vix labitur persecuti eloquentiam ei. Te justo dictas labitur eam. Omnium prompta placerat in sed.
          </div>
        </div>
        <img src="https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg" alt="alt" />
      </Label>
    </div>
  </div>);
}
