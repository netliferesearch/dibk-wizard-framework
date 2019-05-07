import React from 'react';

import { H1, H2, H3 } from '../../../src/web/primitives/Heading';

export default function SchemaTranslating() {
  return (
    <div>
      <H1>Schema translation</H1>
      <p>
        A common use case when building services such as wizards for a wide audience is the need for showing content in more
        than one language.
      </p>

      <p>
        In <em>losen</em> this is handled by allowing you to pass a translations object to the <code>Wizard</code> node
        when rendering the wizard. Multiple languages are supported, and a language selector is shown in the bottom of the
        table of contents if multiple languages are set up. Translations are passed to losen by adding the
        <code>translations</code> to the <code>{`<Wizard>`}</code> component.
      </p>

      <p>
        Losen expects translations provided to be in the following structure:
      </p>

      <pre>{`
{
  // the property name (en) should be the same as the
  // key property inside the object
  en: {
    "key": "en"
    "name": "English",
    "meta": {
      "title": "Title of the wizard"
    },
    "tags": { ... }
  }
}
`}</pre>

      <p>
        The <code>tags</code> property for each translation is an object where the
        properties are references to the <code>id</code> nodes in the schema. Given
        that we have for instance an Input node in our schema with the <code>id</code>
        property set to <code>fornavn</code>, the complete translation object for an
        English translation would look like this 👇
      </p>

      <pre>{`const trans = {
  en: {
    "key": "en"
    "name": "English",
    "meta": {
      "title": "Title of the wizard"
    },
    "tags": {
      "fornavn": {
        "heading": "First name"
      }
    }
  }
}`}</pre>

      <p>
        With the translation above, the field will get the heading "First name" if
        the user selects the English translation.
      </p>

      <H2>Properties for translation items</H2>
      <p>
        Below is an example showing a translation object with all the available properties for an item in the translations
        object.
      </p>

      <pre>{`{
  fornavn: {
    heading: "First name",
    description: "The name you've got that is <strong>not</strong> your family name.",
    image: {
      large: "https://url.to/large/image.png",
      small: "https://url.to/small/image.png",
    }
  }
}`}</pre>

      <H2>Finding the schema node IDs</H2>
      <p>
        When working with the content in the wizard, append `?debug` to the page url to show the
        id of all the nodes in the wizard. The nodes ids will show as pink labels in the top-right
        corner of the component.
      </p>

      <H2>Overriding content (a "hack")</H2>
      <p>
        In some cases you might want simply to override the headings, text or images in the schema.
        If you want non-technical editors to be able to override part of the content in the wizard
        you can add a Norwegian translation with the key <code>no</code> to the wizard.
      </p>

      <p>
        The Norwegian translation is the default one, and the language picker won't show unless you
        add some other language than that.
      </p>
    </div>
  )
}

