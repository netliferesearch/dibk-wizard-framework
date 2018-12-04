import { pick } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Html from '../helper/Html';

import { TD } from '../../primitives/Table';
import TableContainer from '../../primitives/TableContainer';

function TableCell(props) {
  return <TD {...props} />;
}

function TableHeader({ simple, ...props }) {
  return <th {...props} />;
}

TableCell.propTypes = {
  'data-inactive': PropTypes.bool.isRequired,
};

/* eslint-disable react/no-array-index-key */
export default function Table({ cells, debug, simple }) {
  return (
    <TableContainer simple={simple}>
      <table data-debug={debug}>
        <tbody>
          {cells.map((row, rowKey) => (
            <tr key={rowKey}>
              {row.map((cell, cellKey) => {
                const cellProps = {
                  ...pick(cell, ['colSpan', 'rowSpan']),
                  'data-inactive': cell.inactive,
                };

                const Cell = cell.type === 'Heading' ? TableHeader : TableCell;

                return (
                  <Cell data-id={cell.id} {...cellProps} key={cellKey} simple={simple}>
                    <Html text={cell.text} />
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}

Table.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        colSpan: PropTypes.number,
        rowSpan: PropTypes.number,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['Heading', 'Cell']).isRequired,
      }),
    ),
  ).isRequired,
  debug: PropTypes.bool,
  simple: PropTypes.bool,
};

Table.defaultProps = {
  debug: false,
  simple: false,
};

TableHeader.propTypes = {
  simple: PropTypes.bool,
};


TableHeader.defaultProps = {
  simple: false,
};
