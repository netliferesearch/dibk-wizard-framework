import React from 'react';

export const thead = (
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Required</th>
    </tr>
  </thead>
)

export const property = (
  <tr key="property">
    <td><code>property</code></td>
    <td>
      The path to where the value for this node is stored in the data
      object. Uses dot notation for referencing a property of an object, letting you set values
      in nested objects.
    </td>
    <td>Yes</td>
  </tr>
)

export const show = (
  <tr key="show">
    <td><code>show</code></td>
    <td>
      Logical expression deciding whether or not to show the node. Expressed
      using the <a href="/?selectedKind=DSL&selectedStory=Intro">DSL</a>.
    </td>
    <td></td>
  </tr>
)

export const hide = (
  <tr key="hide">
    <td><code>hide</code></td>
    <td>
      Logical expression deciding whether or not to hide the node. Expressed
      using the <a href="/?selectedKind=DSL&selectedStory=Intro">DSL</a>.
    </td>
    <td></td>
  </tr>
);

export const inputProperties = [
  property,
  <tr key="heading">
    <td><code>heading</code></td>
    <td>The label for this input field.</td>
    <td>Yes</td>
  </tr>,
];

export const optionalInputProperties = [
  <tr key="validator">
    <td><code>validator</code></td>
    <td>
      An array of objects containing two properties: <code>test</code>; a logical
      expression that must evaluate to a true in order for the field to be available. If the
      test evaluates to a falsy value, the field will still show, but it will be disabled and a
      message will explain what prerequisites has not been met. The message is defined with the
      <code>error</code> property in the validator object.
    </td>
    <td></td>
  </tr>,
  <tr key="optional">
    <td><code>optional</code></td>
    <td>Mark input as optional. By default all fields are required.</td>
    <td></td>
  </tr>,
  show,
  hide
];
