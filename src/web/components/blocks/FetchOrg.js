import autobind from 'react-autobind';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ApprovalAreas from '../ApprovalAreas';
import checkStatus from '../../../shared/checkstatus';
import Html from '../helper/Html';
import Input from './Input';
import VariableText from '../helper/VariableText';

import { H3 } from '../../primitives/Heading';
import DL from '../../primitives/Datalist';
import ErrorIcon from '../graphics/ErrorIcon';
import { ErrorMessage } from '../../primitives/Errors';
import Information from '../../primitives/Information';
import Loading from '../../primitives/Loading';
import Notice from '../../primitives/Notice';

export default class FetchOrg extends Component {
  static propTypes = {
    currentValue: PropTypes.object,
    information: PropTypes.string,
    invalidapproval: PropTypes.string,
    invalidOrg: PropTypes.string,
    property: PropTypes.string.isRequired,
    setData: PropTypes.func.isRequired,
    SGheading: PropTypes.string,
    SGsource: PropTypes.string,
    SGtext: PropTypes.string,
    source: PropTypes.string.isRequired,
  };

  static defaultProps = {
    currentValue: {},
    information: '',
    invalidapproval: '',
    invalidOrg: '',
    SGheading: '',
    SGsource: '',
    SGtext: '',
  };

  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      loading: false,
    };
  }

  fetchOrgData(orgid) {
    const { property, setData, source } = this.props;
    const id = orgid.toString().replace(/\s/g, '');

    fetch(`${source}%27${id}%27`)
      .then(response => response.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'data')) {
          this.updateOrgData(data, orgid);
        } else {
          setData(property, {
            ...this.props.currentValue,
            invalidOrg: true,
          });
        }
      });
  }

  updateOrgData(data, orgid) {
    const { property, setData } = this.props;
    const name = get(data, 'data[0].navn');
    let postcode;
    let postplace;
    let address;
    if (has(data, 'data[0].postadresse.adresse')) {
      postcode = get(data, 'data[0].postadresse.postnummer');
      postplace = get(data, 'data[0].postadresse.poststed');
      address = get(data, 'data[0].postadresse.adresse');
    } else {
      postcode = get(data, 'data[0].forretningsadresse.postnummer');
      postplace = get(data, 'data[0].forretningsadresse.poststed');
      address = get(data, 'data[0].forretningsadresse.adresse');
    }

    setData(property, {
      ...this.props.currentValue,
      orgid,
      name,
      postcode,
      postplace,
      address,
      dataOrg: true,
      invalidOrg: false,
    });
  }

  fetchSGData(orgid) {
    const id = orgid.toString().replace(/\s/g, '');
    fetch(`${this.props.SGsource}${id}.json`)
      .then(checkStatus)
      .then((data) => {
        this.updateSGData(data);
      })
      .catch((error) => {
        const { property, setData } = this.props;

        setData(property, {
          ...this.props.currentValue,
          status: '',
          validApprovalAreas: '',
          dataSG: false,
        });

        this.setState({ loading: false });

        // eslint-disable-next-line no-console
        console.log(`There is an error fetching from SG: ${error.message}`);
      });
  }

  updateSGData(data) {
    const { property, setData } = this.props;

    const status = get(data, 'dibk-sgdata.status');
    const validApprovalAreas = get(data, 'dibk-sgdata.valid_approval_areas');

    setData(property, {
      ...this.props.currentValue,
      status,
      validApprovalAreas,
      dataSG: true,
    });
    // Set sgdata property.
    setData('sgdata', get(data, 'dibk-sgdata.status.approved', false));

    this.setState({ loading: false });
  }

  update(value) {
    const { property, setData } = this.props;

    if (value && value.toString().replace(/\s/g, '').length === 9) {
      this.setState({ loading: true });
      this.fetchOrgData(value);
      this.fetchSGData(value);
    } else {
      setData(property, { dataOrg: false, dataSG: false });
      setData('sgdata', false);
    }
  }

  render() {
    const { loading } = this.state;

    const {
      information,
      invalidapproval,
      invalidOrg,
      property,
      setData,
      SGheading,
      SGtext,
    } = this.props;

    return (
      <div>
        <Input
          {...this.props}
          currentValue={get(this.props, 'currentValue.orgid')}
          setData={(unused, value) => {
            setData(property, { orgid: value });
          }}
          update={this.update}
        />

        {get(this.props, 'currentValue.dataOrg', false) && (
          <div>
            <br />
            <DL>
              <dt>Firmaets navn</dt>
              <dd>{get(this.props, 'currentValue.name')}</dd>

              <dt>Adresse</dt>
              <dd>{get(this.props, 'currentValue.address')}</dd>

              <dt>Postnummer- og sted</dt>
              <dd>
                {get(this.props, 'currentValue.postcode')}{' '}
                {get(this.props, 'currentValue.postplace')}
              </dd>
            </DL>
            <Information>
              <ErrorIcon triangleFill={'black'} />
              <Html text={information} />
            </Information>
          </div>
        )}
        <div>
          {get(this.props, 'currentValue.fetchSG', false)}
          <div>
            {loading && <Loading>Laster inn data</Loading>}
            {!loading &&
              get(this.props, 'currentValue.dataSG', false) &&
              (
                <Notice>
                  <H3>
                    <VariableText text={SGheading} data={this.props.currentValue} />
                  </H3>
                  <ApprovalAreas areas={get(this.props, 'currentValue.validApprovalAreas')} />
                  <VariableText text={SGtext} data={this.props.currentValue} />
                </Notice>
              )
            }
            {!loading &&
              !get(this.props, 'currentValue.dataSG', false) &&
              get(this.props, 'orgid', false) && <H3>{invalidapproval}</H3>}
          </div>
        </div>
        <div>
          {get(this.props, 'currentValue.invalidOrg', false) && (
            <ErrorMessage>
              <ErrorIcon /> {invalidOrg}
            </ErrorMessage>
          )}
        </div>
      </div>
    );
  }
}
